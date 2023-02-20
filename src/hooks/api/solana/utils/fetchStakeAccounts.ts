import { getPubkey } from './getPubkey';
import { STAKE_PROGRAM } from '../constants';
import { Connection } from '@solana/web3.js';

export async function fetchStakeAccounts(connection: Connection, address: string) {
  const voterPubkey = await getPubkey(STAKE_PROGRAM);
  try {
    // @ts-ignore
    return await connection.getParsedProgramAccounts(voterPubkey, {
      commitment: 'confirmed',
      filters: [
        {
          dataSize: 200
        },
        { memcmp: { bytes: address, offset: 12 } }
      ]
    });
  } catch (e) {
console.log("FETCH_STAKE_ACCOUNTS_ERROR",e)
  }
}
