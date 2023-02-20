import { validateBalance } from './utils/validateBalance';
import { getAccountInfo } from './utils/getAccountInfo';
import { StakeProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { getNet } from './utils/getNet';
import { getConnection } from './utils/getConnection';
import { getPubkey } from './utils/getPubkey';
/**
 *
 */
interface Payload {
  address: string;
  stakeAccountPublicKey: string;
  amount: string;
}

/**
 *
 */
interface Response {
  amount: string;
  network: 'mainnet' | 'devnet';
  serializedTransaction: any;
}

/**
 *
 * @param payload
 */
export async function withdraw(payload: Payload): Promise<Response> {
  const { address, stakeAccountPublicKey, amount } = payload;

  if (!amount) {
    console.log("NOT_SPECIFIED_AMOUNT")
  }

  const amountInLamports = +amount * LAMPORTS_PER_SOL;

  try {
    const net = await getNet();
    const connection = await getConnection();

    const userPubkey = await getPubkey(address);
    const stakeAccPublicKeySer = await getPubkey(stakeAccountPublicKey);
    const stakeAccBalance = await connection.getBalance(stakeAccPublicKeySer);

    await getAccountInfo(connection, userPubkey);

    validateBalance(stakeAccBalance, amountInLamports);

    const transaction = new Transaction();

    const stakeStatus = await connection.getStakeActivation(stakeAccPublicKeySer);

    if (stakeStatus.state === 'activating' || stakeStatus.state === 'active') {
      transaction.add(
        StakeProgram.deactivate({
          stakePubkey: stakeAccPublicKeySer,
          authorizedPubkey: userPubkey
        })
      );
    }

    transaction.add(
      StakeProgram.withdraw({
        stakePubkey: stakeAccPublicKeySer,
        authorizedPubkey: userPubkey,
        toPubkey: userPubkey,
        lamports: amountInLamports
      })
    );

    const block = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = block.blockhash;
    transaction.feePayer = userPubkey;

    return {
      network: net,
      amount: amount,
      serializedTransaction: transaction
        .serialize({
          requireAllSignatures: false,
          verifySignatures: false
        })
        .toString('hex')
    };
  } catch (e) {
    throw e;
  }
}
