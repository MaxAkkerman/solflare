import { PublicKey, PublicKeyInitData} from '@solana/web3.js';

/**
 *
 * @param address
 */
export async function getPubkey(address: PublicKeyInitData) {
  try {
    return new PublicKey(address);
  } catch (err) {
    throw new Error("INVALID_ADDRESS")
  }
}
