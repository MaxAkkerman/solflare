import { getConnection } from './utils/getConnection';
import { getPubkey } from './utils/getPubkey';
import {Authorized, Connection, Keypair, Lockup, StakeProgram} from '@solana/web3.js';
import { getAccountInfo } from './utils/getAccountInfo';
import { getMinBalanceForRent } from './utils/getMinBalanceForRent';
import { getNet } from './utils/getNet';
import { validateBalance } from './utils/validateBalance';
import {Buffer} from 'buffer';
/**
 *
 */
interface Payload {
  address: string;
  amount: string;
}

/**
 *
 */
interface Response {
  amount: string;
  network: 'mainnet' | 'devnet';
  serializedTransaction: string;
  stakeAccountSecretKey: string;
  stakeAccountPublicKey: string;
}

/**
 *
 * @param payload
 */
export async function createStakeAccount(payload: Payload): Promise<any> {
  const { address, amount = '0' } = payload;

  try {
    // const net = await getNet();
    const net = 'devnet';
    // const userPubkey = await getPubkey(address);
    // const connection = await getConnection();
    const [userPubkey, connection] = await Promise.all([getPubkey(address), getConnection()])

    const lamportsForStakeAccount = await getMinBalanceForRent(connection, amount);

    // @ts-ignore
    const { lamports } = await getAccountInfo(connection, userPubkey);
    validateBalance(lamports, lamportsForStakeAccount);

    const stakeAccount = Keypair.generate();
    const stakeAccountSecretKey = Buffer.from(stakeAccount.secretKey).toString('hex');
    const stakeAccountPublicKey = stakeAccount.publicKey.toBase58();

    const createAccountTransaction = StakeProgram.createAccount({
      fromPubkey: userPubkey,
      authorized: new Authorized(userPubkey, userPubkey),
      lamports: lamportsForStakeAccount,
      lockup: new Lockup(0, 0, userPubkey),
      stakePubkey: stakeAccount.publicKey
    });

    const block = await connection.getLatestBlockhash('confirmed');

    createAccountTransaction.recentBlockhash = block.blockhash;
    createAccountTransaction.feePayer = userPubkey;

     return createAccountTransaction
          .serialize({ requireAllSignatures: false, verifySignatures: false })
          .toString('hex')
  } catch (e) {
    throw e;
  }
}
