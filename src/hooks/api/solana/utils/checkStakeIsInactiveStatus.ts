import { Connection, PublicKey } from '@solana/web3.js';

export async function checkStakeIsInactiveStatus(connection: Connection, stakeAccPublicKeySer: PublicKey) {
  try {
    let stakeStatus = await connection.getStakeActivation(stakeAccPublicKeySer);
    if (stakeStatus.state === 'deactivating' || stakeStatus.state === 'inactive') {
console.log("checkStakeIsInactiveStatus error")
    }
    // @ts-ignore
    return stakeStatus.status;
  } catch (e) {}
}
