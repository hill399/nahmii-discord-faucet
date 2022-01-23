import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const NAHMII_URL = process.env.NAHMII_URL as string;
const NAHMII_BRIDGE_ADDR = process.env.NAHMII_BRIDGE_ADDR as string;

const MINTING_ADDR = '0x0000000000000000000000000000000000000000';

const getTransactionCount = async (address: string) => {
    const resp = await axios.get(`${NAHMII_URL}/api`, {
        params: {
            module: 'account',
            action: 'tokentx',
            address: address
        }
    })

    if (resp.status !== 200) return false;
    if (resp.data.result.length !== 1) return false;

    return (resp.data.result[0].from === MINTING_ADDR && resp.data.result[0].input.includes(NAHMII_BRIDGE_ADDR.toLowerCase()));
}

const getAccountBalance = async (address: string) => {
    const resp = await axios.get(`${NAHMII_URL}/api`, {
        params: {
            module: 'account',
            action: 'balance',
            address: address
        }
    })

    if (resp.status !== 200) return 1;
    return parseInt(resp.data.result);
}

export const validateAddressConditions = async (address: string) => {
    const validTransaction = await getTransactionCount(address);
    const accountBalance = await getAccountBalance(address);

    return (validTransaction && accountBalance === 0);
}