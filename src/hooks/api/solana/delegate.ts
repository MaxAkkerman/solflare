import { getAccountInfo } from './utils/getAccountInfo';
import {StakeProgram, Transaction} from '@solana/web3.js';
import { getNet } from './utils/getNet';
import { getSolValidatorPubkey } from './utils/getSolValidatorPubkey';
import { getConnection } from './utils/getConnection';
import { getPubkey } from './utils/getPubkey';
import { checkStakeIsActiveStatus } from './utils/checkStakeIsActiveStatus';

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
  votePublicKey: string;
  serializedTransaction: Transaction;
}

/**
 *
 * @param payload
 */
export async function delegate(payload: Payload): Promise<Response> {
  const { address, stakeAccountPublicKey } = payload;

  try {
    const net = await getNet();
    const validator = await getSolValidatorPubkey();

    // @ts-ignore
    const connection = await getConnection();

    const userPubkey = await getPubkey(address);
    const votePubkeySer = await getPubkey(validator);
    const stakeAccPublicKeySer = await getPubkey(stakeAccountPublicKey);

    // @ts-ignore
    await checkStakeIsActiveStatus(connection, stakeAccPublicKeySer);
    // @ts-ignore
    await getAccountInfo(connection, userPubkey);


    let delegateTransaction = StakeProgram.delegate({
      // @ts-ignore

      stakePubkey: stakeAccPublicKeySer,
      // @ts-ignore
      authorizedPubkey: userPubkey,
      // @ts-ignore
      votePubkey: votePubkeySer
    });

    // @ts-ignore
    const block = await connection.getLatestBlockhash('confirmed');
    delegateTransaction.recentBlockhash = block.blockhash;
    delegateTransaction.feePayer = userPubkey;

    return {
      network: net,
      votePublicKey: validator,
      serializedTransaction: delegateTransaction
        // .serialize({ requireAllSignatures: false, verifySignatures: false })
        // .toString('hex')
    };
  } catch (e) {
    throw e;
  }
}
