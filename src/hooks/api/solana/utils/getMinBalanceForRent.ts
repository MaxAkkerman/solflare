import { LAMPORTS_PER_SOL, StakeProgram } from '@solana/web3.js';

export async function getMinBalanceForRent(connection: { getMinimumBalanceForRentExemption: (arg0: any) => any; }, amount: string) {
  try {
    const amountInLamports = +amount * LAMPORTS_PER_SOL;
    return (await connection.getMinimumBalanceForRentExemption(StakeProgram.space)) + amountInLamports;
  } catch (e) {
console.log("CONNECTION_ERROR",e)
  }
}
