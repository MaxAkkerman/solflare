import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import BN from 'bn.js';
import {Buffer} from 'buffer';
import {usePhantom} from "../hooks/usePhantom";
import {useLedgerCosmosWallet} from "../hooks/useSolana";
import {delegate} from "../hooks/api/solana/delegate";
import {deactivate} from "../hooks/api/solana/deactivate";
import {withdraw} from "../hooks/api/solana/withdraw";

// @ts-ignore
window.Buffer = Buffer;

const address = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"
// const stakeAccountPublicKey = "HhjejLGRmGoGbH4XN8UquMKMH3BiZZ5mJLyBaCkZPLer";
const stakeAccountPublicKey = '4rPRsVNdCF27sq7PAv9iTWaTNZH1QhioTrXSo19Azd1h';


// @ts-ignore
export function Solflare({tx}) {


    const {
        publicKey,
        disconnect,
        connect,
        status,
        sign,
        isSolflare
    } = useLedgerCosmosWallet();

    return (
        <div>

            <div style={{margin: "auto", padding: '20px', minWidth: "487px"}}>
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

                <div style={{display: "flex", flexDirection: "column", margin: '15px'}}>

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
                            onClick={() => sign({tx, address, stakeAccountPublicKey})}>
                        Sign Current TX
                    </Button>

                </div>

            </div>

        </div>
    );
}

