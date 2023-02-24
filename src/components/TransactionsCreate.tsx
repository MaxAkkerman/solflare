import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import {Buffer} from 'buffer';
import {getStakeAccounts} from "../hooks/api/solana/getStakeAccounts";
import {delegate} from "../hooks/api/solana/delegate";
import {createStakeAccount} from "../hooks/api/solana/createStakeAccount";
import {deactivate} from "../hooks/api/solana/deactivate";
import {withdraw} from "../hooks/api/solana/withdraw";
import {Solflare} from "./Solflare";
import Phantom from './Phantom';

// @ts-ignore
window.Buffer = Buffer;

const address = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"
// const stakeAccountPublicKey = "HhjejLGRmGoGbH4XN8UquMKMH3BiZZ5mJLyBaCkZPLer";
const stakeAccountPublicKey = '4rPRsVNdCF27sq7PAv9iTWaTNZH1QhioTrXSo19Azd1h';
const publicKey = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"


function TransactionsCreate() {
    const [userStakes, setUserStakes] = useState([])
    const [serializedTransaction, setTx] = useState(null)
    const [sol, setSol] = useState(true)

    async function getDT() {
        const res = await getStakeAccounts({address});
        console.log("res", res)
        // @ts-ignore
        setUserStakes(res)
    }

    async function getDelegateTx() {
        const tx = await delegate({
            address,
            stakeAccountPublicKey: "Hi3xfyCcZxeyCXCQXF38Aqvqmj4BgoHMTY3vXNvHgcvh"
        })
        // @ts-ignore
        setTx(tx)
    }

    async function handlecreateStakeAccount() {
        const tx = await createStakeAccount({address: publicKey, amount: "0"})
        setTx(tx)

    }

    async function transferTx() {
        // // @ts-ignore
        // const wallet = await provider?.publicKey

        let connection = new Connection(clusterApiUrl('devnet'));

        let transaction = new Transaction()
            .add(
                SystemProgram.transfer({
                    // @ts-ignore
                    fromPubkey: new PublicKey(publicKey),
                    // @ts-ignore
                    toPubkey: new PublicKey(publicKey),
                    lamports: 1000000000,
                })
            );
        // let {blockhash} = await connection.getLatestBlockhash();
        // // @ts-ignore
        // transaction.recentBlockhash = blockhash;
        // // @ts-ignore
        // transaction.feePayer = publicKey;
        // @ts-ignore
        setTx(transaction)
        console.log("dtata", transaction)


    }


    // @ts-ignore
    return (
        <div className="App">
            <Button onClick={() => setSol(true)}>Solana</Button>
            <Button onClick={() => setSol(false)}>Phantom</Button>

            <div style={{display: "flex", flexDirection: "row", margin: '30px', padding: '20px'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    Get tx hashes
                    <Button
                        variant="outlined"
                        // @ts-ignore
                        onClick={() => delegate({address: publicKey, stakeAccountPublicKey: userStakes[0].publicKey})}>
                        Delegate stakes
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handlecreateStakeAccount()}>
                        create Stake Account stakes
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => deactivate({
                            address: publicKey,
                            // @ts-ignore
                            stakeAccountPublicKey: userStakes[0].publicKey
                        })}>
                        Deactivate stakes
                    </Button>

                    <Button
                        variant="outlined"
                        // @ts-ignore
                        onClick={() => withdraw({
                            address: publicKey,
                            // @ts-ignore
                            stakeAccountPublicKey: userStakes[0].publicKey,
                            amount: "0"
                        })}>
                        Withdraw stakes
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => transferTx()}>
                        transfer tx
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => getDT()}>
                        [dev] get user stakes
                    </Button>
                </div>
                <div>
                    {sol ?
                        <Solflare
                            tx={serializedTransaction}
                        />
                        :
                        <Phantom
                            tx={serializedTransaction}
                        />

                    }

                </div>
            </div>
            {/*<div>*/}
            {/*   tx: {serializedTransaction}*/}
            {/*</div>*/}
            <div style={{
                height: "fitContent",
                margin: '30px',
                flexWrap: 'wrap',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {userStakes.length > 0 && userStakes.map((item: any) => {
                        return <div style={{margin: "5px"}}>
                            <div>Public key: {item.publicKey}</div>
                            <div>Rent epoch: {item.rentEpoch}</div>
                            <div>Stake: {item.stake}</div>
                            <div>Active: {item.status.active}</div>
                            <div>Inactive: {item.status.inactive}</div>
                            <div>Balance: {item.lamports}</div>
                            <div>Validator public key: {item.validatorPublicKey || 'null'}</div>
                        </div>
                    }
                )
                }
            </div>


        </div>

    )
}

export default TransactionsCreate;
