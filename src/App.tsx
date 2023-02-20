import React, {useEffect, useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import {getStakeAccounts} from "./hooks/api/solana/getStakeAccounts";
import {delegate} from "./hooks/api/solana/delegate";
import {useLedgerCosmosWallet} from "./hooks/useSolana";
import {withdraw} from "./hooks/api/solana/withdraw";
import {createStakeAccount} from "./hooks/api/solana/createStakeAccount";
import {deactivate} from "./hooks/api/solana/deactivate";

const address = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"
// const stakeAccountPublicKey = "HhjejLGRmGoGbH4XN8UquMKMH3BiZZ5mJLyBaCkZPLer";
const stakeAccountPublicKey = '4rPRsVNdCF27sq7PAv9iTWaTNZH1QhioTrXSo19Azd1h';

function App() {
    const [serializedTransaction, setTx] = useState(null)
    const [userStakes, setUserStakes] = useState([])

    async function getDT() {
        const res = await getStakeAccounts({address});
        console.log("res", res)
        // @ts-ignore
        setUserStakes(res)
    }

    async function getDelegateTx() {
        const delegateTr = await delegate({
            address,
            stakeAccountPublicKey: "Hi3xfyCcZxeyCXCQXF38Aqvqmj4BgoHMTY3vXNvHgcvh"
        })
        console.log("delegateTr", delegateTr)
        // @ts-ignore
        setTx(delegateTr.serializedTransaction)
    }

    async function handlecreateStakeAccount(){
        const result = await createStakeAccount({address: publicKey, amount:"0"})
    }


    const {
        publicKey,
        disconnect,
        connect,
        status,
        sign,
        isSolflare
    } = useLedgerCosmosWallet();

    return (
        <div className="App">

            <div style={{width: "40%", margin: "auto"}}>
                solflare
                <div>
                    User Public key: {publicKey || "empty"}
                </div>

                <div>
                    Status: {status}
                </div>

                <div>
                    Is Solflare availdable: {isSolflare.toString()}
                </div>

                <div style={{display: "flex", flexDirection: "column", width: '45%', margin: '30px'}}>

                    Wallet
                    <Button
                        variant="outlined"
                        onClick={() => connect()}>
                        connect wallet
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => disconnect()}>
                        disconnect wallet
                    </Button>

                    <Button variant="outlined"
                            onClick={() => sign({serializedTransaction, address, stakeAccountPublicKey})}>
                        sign transaction meassag
                    </Button>

                </div>
                <div style={{display: "flex", flexDirection: "column", width: '45%', margin: '30px'}}>

                    Dev
                    <Button
                        variant="outlined"
                        onClick={() => getDT()}>
                        [dev] get user stakes
                    </Button>
                </div>
                <div style={{display: "flex", flexDirection: "column", width: '45%', margin: '30px'}}>

                    Get tx hashes
                    <Button
                        variant="outlined"
                        // @ts-ignore
                        onClick={() => delegate({address:publicKey, stakeAccountPublicKey:userStakes[0].publicKey})}>
                        Delegate stakes
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handlecreateStakeAccount()}>
                        create Stake Account stakes
                    </Button>
                    <Button
                        variant="outlined"
                        // @ts-ignore
                        onClick={() => deactivate({address:publicKey, stakeAccountPublicKey:userStakes[0].publicKey})}>
                        Deactivate stakes
                    </Button>

                    <Button
                        variant="outlined"
                        // @ts-ignore
                        onClick={() => withdraw({address:publicKey, stakeAccountPublicKey:userStakes[0].publicKey, amount:"0"})}>
                        Withdraw stakes
                    </Button>
                </div>
            </div>
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
    );
}

export default App;
