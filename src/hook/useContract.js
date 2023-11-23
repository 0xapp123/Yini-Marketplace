import { Abi,  } from "viem";
import { read, write } from "./utils";
import { LP_TOKEN_ABI, LP_TOKEN_ADDRESS } from "../config";

export function useContract() {
  const approve = async (
    tokenAddress,
    spender,
    amount,
  ) => {
    return await write({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "approve",
      args: [spender, amount],
    });
  };

  const balanceOf = async (accountAddress) => {
    return await read({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'balanceOf',
      args: [accountAddress]
    })
  };

  const getRealPrice = async () => {
    return await read({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getRealPrice',
    })
  };

  return {
    approve,
    balanceOf,
    getRealPrice
  };
}