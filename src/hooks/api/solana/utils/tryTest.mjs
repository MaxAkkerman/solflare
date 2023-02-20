import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';

export async function tryTest() {
    let connection = new Connection(clusterApiUrl('devnet'));
    let providerUrl = 'https://solflare.com/provider';
    let wallet = new Wallet(providerUrl);
    wallet.on('connect', publicKey => console.log('Connected to ' + publicKey.toBase58()));
    wallet.on('disconnect', () => console.log('Disconnected'));
    await wallet.connect();

    let transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: wallet.publicKey,
            lamports: 100,
        })
    );
    let {blockhash} = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;
    let signed = await wallet.signTransaction(transaction);
    let txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
}

tryTest()