import { Abi,  } from "viem";
import { read, write } from "./utils";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

export function useContract() {
 
  const getRealPrice = async () => {
    return await read({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getRealPrice',
    })
  };

  return {
    getRealPrice
  };
}