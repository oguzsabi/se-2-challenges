/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    Streamer: {
      address: "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Challenged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "Closed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Opened",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Withdrawn",
          type: "event",
        },
        {
          inputs: [],
          name: "challengeChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "defundChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "fundChannel",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "channel",
              type: "address",
            },
          ],
          name: "timeLeft",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "updatedBalance",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "r",
                      type: "bytes32",
                    },
                    {
                      internalType: "bytes32",
                      name: "s",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint8",
                      name: "v",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct Streamer.Signature",
                  name: "sig",
                  type: "tuple",
                },
              ],
              internalType: "struct Streamer.Voucher",
              name: "voucher",
              type: "tuple",
            },
          ],
          name: "withdrawEarnings",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
  11155111: {
    Streamer: {
      address: "0xa05912E587e79ff622656c5309AA6d4feF817b64",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Challenged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "Closed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Opened",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "Withdrawn",
          type: "event",
        },
        {
          inputs: [],
          name: "challengeChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "defundChannel",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "fundChannel",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "channel",
              type: "address",
            },
          ],
          name: "timeLeft",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "updatedBalance",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "bytes32",
                      name: "r",
                      type: "bytes32",
                    },
                    {
                      internalType: "bytes32",
                      name: "s",
                      type: "bytes32",
                    },
                    {
                      internalType: "uint8",
                      name: "v",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct Streamer.Signature",
                  name: "sig",
                  type: "tuple",
                },
              ],
              internalType: "struct Streamer.Voucher",
              name: "voucher",
              type: "tuple",
            },
          ],
          name: "withdrawEarnings",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
