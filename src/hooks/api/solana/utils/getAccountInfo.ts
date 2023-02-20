import {Connection, PublicKey} from '@solana/web3.js';

export async function getAccountInfo(connection: Connection, userPubkey: PublicKey) {
    try {
        const accInfo = await connection.getAccountInfo(userPubkey);
        if (!accInfo) {
            console.log("ACCOUNT_DOES_NOT_EXIST")
        }
        return accInfo;
    } catch (e) {
        console.log("ACCOUNT_DOES_NOT_EXIST")
        return null
    }
}
