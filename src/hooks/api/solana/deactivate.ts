import { getAccountInfo } from './utils/getAccountInfo';
import { StakeProgram } from '@solana/web3.js';
import { getConnection } from './utils/getConnection';
import { getNet } from './utils/getNet';
import { getPubkey } from './utils/getPubkey';
import { checkStakeIsInactiveStatus } from './utils/checkStakeIsInactiveStatus';

/**
 *
 */
interface Payload {
  address: string;
  stakeAccountPublicKey: string;
}

/**
 *
 */
interface Response {
  network: 'mainnet' | 'devnet';
  serializedTransaction: any;
}

/**
 *
 * @param payload
 */
export async function deactivate(payload: Payload): Promise<Response> {
  const { address, stakeAccountPublicKey } = payload;
  try {
    const connection = await getConnection();
    const net = await getNet();

    const userPubkey = await getPubkey(address);
    const stakeAccPublicKeySer = await getPubkey(stakeAccountPublicKey);

    await checkStakeIsInactiveStatus(connection, stakeAccPublicKeySer);
    await getAccountInfo(connection, userPubkey);

    let deactivateTransaction = StakeProgram.deactivate({
      stakePubkey: stakeAccPublicKeySer,
      authorizedPubkey: userPubkey
    });
    const block = await connection.getLatestBlockhash('confirmed');
    deactivateTransaction.recentBlockhash = block.blockhash;
    deactivateTransaction.feePayer = userPubkey;
    return {
      network: net,
      serializedTransaction: deactivateTransaction
        .serialize({ requireAllSignatures: false, verifySignatures: false })
        .toString('hex')
    };
  } catch (e) {
    throw e;
  }
}
