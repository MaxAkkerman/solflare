import { Connection, PublicKey } from "@solana/web3.js";

export async function checkStakeIsActiveStatus(connection: Connection, stakeAccPublicKeySer: PublicKey) {
  try {
    let stakeStatus = await connection.getStakeActivation(stakeAccPublicKeySer);
    if (stakeStatus.state === 'activating' || stakeStatus.state === 'active') {
console.log("checkStakeIsActiveStatus error")
    }
    // @ts-ignore
    return stakeStatus.status;
  } catch (e) {}
}
