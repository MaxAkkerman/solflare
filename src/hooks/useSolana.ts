import {useEffect, useState} from 'react';

import Solflare from '@solflare-wallet/sdk';
import {Transaction, Connection, SystemProgram, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {SOLANA_API_DEV} from "./api/solana/constants";
import {delegate} from "./api/solana/delegate";
import {getConnection} from "./api/solana/utils/getConnection";


export function useLedgerCosmosWallet() {
    const [publicKey, setPublicKey] = useState("");
    const [status, setStatus] = useState('disconnected');
    const [wallet, setWallet] = useState(null);

    const [isSolflare, setIsSolflare] = useState(false)

    useEffect(() => {
        // @ts-ignore
        setIsSolflare(window["solflare"]?.isSolflare || false)

    }, [])

    /**
     *
     */
    async function disconnect() {
        if (status === 'connecting') {
            return;
        }
        try {
            // @ts-ignore
            await wallet.disconnect();

            setStatus("disconnected")
            setPublicKey("");
            setWallet(null);
        } catch (e) {
            console.log("disconnect error", e)

        }
    }

    async function connect() {
        try {
            setStatus('connecting');

            const wallet = new Solflare();
            console.log("wallet", wallet)
            await wallet.connect();

            // @ts-ignore
            setPublicKey(wallet.publicKey.toString());
            // @ts-ignore
            setWallet(wallet);

            setStatus("connected")
        } catch (e) {
            setStatus("disconnected")
            console.log("connect error", e)
        }
    }

    /**
     *
     * @param payload
     */
    async function sign(payload: any) {
        console.log("transaction", publicKey, wallet)

        // if (status !== 'connected') {
        //     return;
        // }
        let connection = new Connection(clusterApiUrl('devnet'));
        // let {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash();
        // const wallet = new Solflare();

        // wallet.on('connect', () => console.log('connected', wallet.publicKey.toString()));
        // wallet.on('disconnect', () => console.log('disconnected'));

        try {
            // await wallet.connect();
            // @ts-ignore
            let transaction = new Transaction()
                .add(
                    SystemProgram.transfer({
                        // @ts-ignore
                        fromPubkey: wallet.publicKey,
                        // @ts-ignore
                        toPubkey: new PublicKey("9DbSqKfbFDmEt8DAMcnQ9ycwdWeDp8btBFogwD4u7yxn"),
                        lamports: 90000000,
                    })
                );
            let {blockhash} = await connection.getLatestBlockhash();
            // @ts-ignore
            transaction.recentBlockhash = blockhash;
            // @ts-ignore
            transaction.feePayer = new PublicKey(publicKey);
            // console.log("wallet.publicKey.toString(),",wallet.publicKey.fromPublicKey(), "lll")
            // let transaction = new Transaction()
            //     .add(
            //         SystemProgram.transfer({
            //             // @ts-ignore
            //             fromPubkey: wallet.publicKey,
            //             // @ts-ignore
            //             toPubkey: wallet.publicKey,
            //             lamports: 1000000000,
            //         })
            //     );
            // let { blockhash } = await connection.getRecentBlockhash();
            // // @ts-ignore
            // transaction.recentBlockhash = blockhash;
            // // @ts-ignore
            // transaction.feePayer = wallet.publicKey;
            // console.log("dtata", transaction, "wallet.publicKey", wallet.publicKey, "blockhash",blockhash)
            // @ts-ignore
            let signed = await wallet.signTransaction(transaction);
            let txid = await connection.sendRawTransaction(signed.serialize());
            await connection.confirmTransaction(txid);


                // const transaction = await wallet.signTransaction(new Transaction(
            //     {
            //          blockhash,
            //         feePayer: wallet.publicKey,
            //         lastValidBlockHeight
                    // instructions:SystemProgram.transfer({
                    //     // @ts-ignore
                    //
                    //     fromPubkey: wallet.publicKey,
                    //     // @ts-ignore
                    //
                    //     toPubkey: wallet.publicKey,
                    //     lamports: 100,
                    // })
            //     }
            // ));
            console.log("transaction", signed)
            // const encoder = new TextEncoder();
            // const messageBytes = encoder.encode('Test message');
            // const messageSignature = await wallet.signMessage(messageBytes, 'utf8');
            // console.log("messageSignature", messageSignature)

            // await wallet.disconnect();
        } catch (err) {
            console.log(err);
        }
    }

    return {
        publicKey,
        disconnect,
        connect,
        status,
        sign,
        isSolflare
    };
}


