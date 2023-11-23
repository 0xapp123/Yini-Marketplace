import {
  writeContract,
  waitForTransaction,
  prepareWriteContract,
  readContract,
} from "@wagmi/core";

export const write = async (config) => {
  const { request } = await prepareWriteContract(config);
  const { hash } = await writeContract(request);
  return await waitForTransaction({ hash });
};

export const read = async (config) => {
  const result = await readContract(config);
  return result;
};