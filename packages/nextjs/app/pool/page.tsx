"use client";

import { type FC, useMemo, useState } from "react";
import { TransactionData, getPoolServerUrl } from "../create/page";
import { TransactionItem } from "./_components";
import { useInterval } from "usehooks-ts";
import { useChainId } from "wagmi";
import {
  useDeployedContractInfo,
  useScaffoldContract,
  useScaffoldEventHistory,
  useScaffoldReadContract,
} from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";
import { Address } from "viem";

const Pool: FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>();
  // const [subscriptionEventsHashes, setSubscriptionEventsHashes] = useState<`0x${string}`[]>([]);
  const { targetNetwork } = useTargetNetwork();
  const poolServerUrl = getPoolServerUrl(targetNetwork.id);
  const { data: contractInfo } = useDeployedContractInfo("MetaMultiSigWallet");
  const chainId = useChainId();
  const { data: nonce } = useScaffoldReadContract({
    contractName: "MetaMultiSigWallet",
    functionName: "nonce",
  });

  const { data: eventsHistory } = useScaffoldEventHistory({
    contractName: "MetaMultiSigWallet",
    eventName: "ExecuteTransaction",
    fromBlock: 0n,
    watch: true,
  });

  const { data: metaMultiSigWallet } = useScaffoldContract({
    contractName: "MetaMultiSigWallet",
  });

  const historyHashes = useMemo(() => eventsHistory?.map(ev => ev.log.args.hash) || [], [eventsHistory]);

  useInterval(() => {
    const getTransactions = async () => {
      try {
        const transactions: { key: Address; hash: TransactionData['hash']; value: TransactionData }[] = (await (
          await fetch(`${poolServerUrl}${contractInfo?.address}_${chainId}`)
        ).json() as { key: Address; hash: TransactionData['hash']; value: string }[]).map(tx => ({ ...tx, value: JSON.parse(tx.value as string) }));

        const newTransactions: TransactionData[] = [];

        for (const tx of transactions) {
          const validSignatures = [];

          for (const signature of tx.value.signatures) {
            const signer = (await metaMultiSigWallet?.read.recover([
              tx.hash,
              signature,
            ])) as `0x${string}`;

            const isOwner = await metaMultiSigWallet?.read.isOwner([signer as `0x${string}`]);

            if (signer && isOwner) {
              validSignatures.push({ signer, signature });
            }
          }

          const update: TransactionData = { ...tx.value, validSignatures };
          newTransactions.push(update);
        }

        setTransactions(newTransactions);
      } catch (e) {
        notification.error("Error fetching transactions");
        console.log(e);
      }
    };

    getTransactions();
  }, 3777);

  const lastTx = useMemo(
    () =>
      transactions
        ?.filter(tx => historyHashes.includes(tx.hash))
        .sort((a, b) => (BigInt(a.nonce) < BigInt(b.nonce) ? 1 : -1))[0],
    [historyHashes, transactions],
  );

  return (
    <div className="flex flex-col flex-1 items-center my-20 gap-8">
      <div className="flex items-center flex-col flex-grow w-full max-w-2xl">
        <div className="flex flex-col items-center bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full">
          <div className="text-xl font-bold">Pool</div>

          <div>Nonce: {nonce !== undefined ? `#${nonce}` : "Loading..."}</div>

          <div className="flex flex-col mt-8 gap-4">
            {transactions === undefined
              ? "Loading..."
              : transactions.map(tx => {
                return (
                  <TransactionItem
                    key={tx.hash}
                    tx={tx}
                    completed={historyHashes.includes(tx.hash)}
                    outdated={lastTx?.nonce != undefined && BigInt(tx.nonce) <= BigInt(lastTx?.nonce)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
