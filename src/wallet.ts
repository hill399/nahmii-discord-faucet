import { providers, utils, Wallet } from "ethers";
import { log } from "./logger";
import * as dotenv from "dotenv";

dotenv.config();

const NAHMII_RPC = process.env.NAHMII_RPC as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const FAUCET_DRIP_WEI = process.env.FAUCET_DRIP_WEI as string;

const getProvider = () => {
  return new providers.JsonRpcProvider(NAHMII_RPC);
};

export const sendEtherToAddress = async (address: string) => {
  try {
    const provider = getProvider();
    const wallet = new Wallet(PRIVATE_KEY, provider);

    const params = {
      to: address,
      value: utils.parseUnits(FAUCET_DRIP_WEI, "wei"),
    };

    const tx = await wallet.sendTransaction(params);
    await tx.wait();

    log.info(`Dripped to ${address}`);

    return tx.hash;
  } catch (e: any) {
    log.info(`Error dripping to ${address}. Message: ${e.message}`);
    return null;
  }
};

export const getWalletAddress = async () => {
  const wallet = new Wallet(PRIVATE_KEY);
  return await wallet.getAddress();
}
