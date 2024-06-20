import { CashOutVoucherButton } from "./CashOutVoucherButton";
import { STREAM_ETH_VALUE, Voucher } from "./Guru";
import { Address as AddressType, formatEther, parseEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type RubeWisdomBoxProps = {
  clientAddress: AddressType;
  challenged: Record<AddressType, bigint>;
  closed: boolean;
  voucher: Voucher;
  wisdom: string;
  provideService: (client: AddressType, wisdom: string) => void;
};

let initialTimeLeft = 0;

export const RubeWisdomBox = ({
  clientAddress,
  challenged,
  closed,
  voucher,
  wisdom,
  provideService,
}: RubeWisdomBoxProps) => {
  const { data: timeLeft } = useScaffoldReadContract({
    contractName: "Streamer",
    functionName: "timeLeft",
    args: [clientAddress],
    watch: true,
  });

  if (Number(timeLeft) * 1000 > initialTimeLeft) {
    initialTimeLeft = Number(timeLeft) * 1000;
  }

  return challenged[clientAddress] !== undefined &&
    !timeLeft &&
    Date.now() + (initialTimeLeft ?? 0) > Number(challenged[clientAddress]) * 1000 + 30000 ? null : (
    <div className="mt-4 w-full flex flex-col">
      <div key={clientAddress} className="w-full flex flex-col border-primary border-t py-6">
        <Address address={clientAddress} size="xl" />
        <textarea
          className="mt-3 bg-base-200"
          rows={3}
          placeholder="Provide your wisdom here..."
          onChange={e => {
            e.stopPropagation();
            const updatedWisdom = e.target.value;
            provideService(clientAddress, updatedWisdom);
          }}
          value={wisdom}
        />

        <div className="mt-2 flex justify-between">
          <div>
            Served: <strong>{wisdom?.length || 0}</strong>&nbsp;chars
          </div>
          <div>
            Received:{" "}
            <strong id={`claimable-${clientAddress}`}>
              {voucher ? formatEther(parseEther(STREAM_ETH_VALUE) - voucher.updatedBalance) : 0}
            </strong>
            &nbsp;ETH
          </div>
        </div>

        {/* Checkpoint 4: */}
        <CashOutVoucherButton
          key={clientAddress}
          clientAddress={clientAddress}
          challenged={challenged[clientAddress] !== undefined}
          closed={closed}
          voucher={voucher}
        />
      </div>
    </div>
  );
};
