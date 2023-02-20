import { PublicKey, PublicKeyInitData} from '@solana/web3.js';

/**
 *
 * @param address
 */
export async function validateSolanaAddress(address: PublicKeyInitData) {
  try {
    const publicKey = new PublicKey(address);

    return PublicKey.isOnCurve(publicKey.toBuffer());
  } catch (error) {
    return false;
  }
}
