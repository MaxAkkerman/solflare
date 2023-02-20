import { StakeData } from '../interface';

export async function reduceStakeAccounts(arr: any[] | undefined): Promise<StakeData[]> {
  // @ts-ignore
  return arr.reduce((acc, el) => {
    const temp = {};
    // @ts-ignore
    temp['publicKey'] = el.pubkey.toBase58();
    // @ts-ignore
    temp['rentEpoch'] = el.account.rentEpoch;
    // @ts-ignore

    temp['lamports'] = el.account.lamports;
    if (!el.account.data.parsed.info.stake) {
      // @ts-ignore

      temp['stake'] = 0;
      // @ts-ignore

      temp['validatorPublicKey'] = null;
    } else {
      // @ts-ignore

      temp['stake'] = el.account.data.parsed.info.stake.delegation.stake;
      // @ts-ignore

      temp['validatorPublicKey'] = el.account.data.parsed.info.stake.delegation.voter;
    }
    return [...acc, temp];
  }, []);
}
