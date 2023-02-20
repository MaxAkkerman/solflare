import { getPubkey } from './getPubkey';
import { getConnection } from './getConnection';
// import { StakeStatus } from '../interface';

export async function getStakeStatus(normalizedData: any[]) {
  try {
    return await Promise.all(normalizedData.map(item => getStakeStatusPromise(item.publicKey)));
  } catch (e) {
    console.log("FETCH_STAKE_ERROR",e)
  }
}

async function getStakeStatusPromise(publicKey: any) {
  try {
    const pubKey = await getPubkey(publicKey);
    const connection = await getConnection();
    return {
      publicKey: publicKey,
      // @ts-ignore

      status: await connection.getStakeActivation(pubKey)
    };
  } catch (e) {
    console.log("FETCH_STAKE_ERROR",e)
  }
}
