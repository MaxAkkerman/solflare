import {SOLANA_API, SOLANA_API_DEV} from '../constants';
import {Connection} from '@solana/web3.js';

/**
 *
 */
export async function getConnection() {
    try {
        const solAPI = SOLANA_API_DEV;

        return new Connection(solAPI, {commitment: 'confirmed'});
    } catch (err) {
        console.log("getConnection error")
        throw new Error("getConnection error")
    }


}
