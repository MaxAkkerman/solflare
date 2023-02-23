import {useEffect, useState} from 'react';
import {Transaction, Connection, SystemProgram, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {PhantomProvider} from "./interfaces";


export function usePhantom() {
    const [publicKey, setPublicKey] = useState<PhantomProvider | undefined>(
        undefined
    );
    const [status, setStatus] = useState('disconnected');
    // const [wallet, setWallet] = useState(null);
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
        undefined
    );
    const getProvider = (): PhantomProvider | undefined => {
        if ("solana" in window) {
            // @ts-ignore
            const provider = window.solana as any;
            if (provider.isPhantom) return provider as PhantomProvider;
        }
    };

    // const [isSolflare, setIsSolflare] = useState(false)
    useEffect(() => {
        const provider = getProvider();

        if (provider) setProvider(provider);
        else setProvider(undefined);
    }, []);


    /**
     *
     */
    async function disconnect() {
        if (status === 'connecting') {
            return;
        }
        try {
            // @ts-ignore
// @ts-ignore
            const { solana } = window;

            if (publicKey && solana) {
                await (solana as PhantomProvider).disconnect();
                setPublicKey(undefined);
                setStatus("disconnected")
            }
        } catch (e) {
            console.log("disconnect error", e)

        }
    }
    const connect = async () => {
        // @ts-ignore
        const { solana } = window;

        if (solana) {
            try {
                const response = await solana.connect();
                console.log('wallet account ', response.publicKey.toString());
                setPublicKey(response.publicKey.toString());
                setStatus('connected')
            } catch (err) {
                console.log("connect error",err)
                // { code: 4001, message: 'User rejected the request.' }
            }
        }
    };


    /**
     *
     * @param payload
     */
    async function sign(payload: any) {

        // if (status !== 'connected') {
        //     return;
        // }
        // let connection = new Connection(clusterApiUrl('devnet'));

        // let {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash();

        // const wallet = new Solflare();

        // wallet.on('connect', () => console.log('connected', wallet.publicKey.toString()));
        // wallet.on('disconnect', () => console.log('disconnected'));

        try {
        //     await wallet.connect();
        //     @ts-ignore
            console.log("sign")

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
            // let signed = await wallet.signTransaction(transaction);




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
            // console.log("transaction", signed)
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
        disconnect,
        connect,
        sign,
        provider,
        status,
        publicKey
    };
}


