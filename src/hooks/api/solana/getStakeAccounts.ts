import { getConnection } from './utils/getConnection';
import { reduceStakeAccounts } from './utils/reduceStakeAccounts';
import { getStakeStatus } from './utils/getStakeStatus';
import { compareStakeData } from './utils/compareStakeData';
import { fetchStakeAccounts } from './utils/fetchStakeAccounts';
import { StakeDataFinalized } from './interface';
import { getPubkey } from './utils/getPubkey';

/**
 *
 */
interface Payload {
  address: string;
}

/**
 *
 */
interface Response extends StakeDataFinalized {}

/**
 *
 * @param payload
 */
export async function getStakeAccounts(payload: Payload): Promise<Response[]> {
  const { address } = payload;

  const connection = await getConnection();
  try {
    await getPubkey(address);
    // @ts-ignore
    const stakeAccounts = await fetchStakeAccounts(connection, address);
    const normalizedData = await reduceStakeAccounts(stakeAccounts);
    const stakeStatusArr = await getStakeStatus(normalizedData);

    return await compareStakeData(normalizedData, stakeStatusArr);
  } catch (e) {
    throw e;
  }
}
