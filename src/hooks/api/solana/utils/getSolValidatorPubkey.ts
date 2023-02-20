
import { ALLNODES_CONTRACT_ADDRESS, DEVNET_CONTRACT_ADDRESS } from '../constants';

export async function getSolValidatorPubkey(): Promise<string> {
  return DEVNET_CONTRACT_ADDRESS;
}
