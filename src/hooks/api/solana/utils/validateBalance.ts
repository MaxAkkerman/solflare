
export function validateBalance(balance: number, lamportsForStakeAccount: number) {
  if (balance < lamportsForStakeAccount) {
console.log("NOT_ENOUGH_SOL")
  }
}
