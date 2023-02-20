import { StakeDataFinalized } from '../interface';

export async function compareStakeData(normalizedData: any[], stakeStatusArr: any[] | undefined): Promise<StakeDataFinalized[]> {
  return normalizedData.reduce((acc, val) => {
    // @ts-ignore
    const currentStakeWithStatus = stakeStatusArr.filter(el => {
      return el.publicKey === val.publicKey;
    });
    const tempObj = {
      ...val,
      ...currentStakeWithStatus[0]
    };
    return [...acc, tempObj];
  }, []);
}
