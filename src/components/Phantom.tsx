import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import BN from 'bn.js';
import {Buffer} from 'buffer';
import {usePhantom} from "../hooks/usePhantom";

// @ts-ignore
window.Buffer = Buffer;

const address = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"
// const stakeAccountPublicKey = "HhjejLGRmGoGbH4XN8UquMKMH3BiZZ5mJLyBaCkZPLer";
const stakeAccountPublicKey = '4rPRsVNdCF27sq7PAv9iTWaTNZH1QhioTrXSo19Azd1h';


// @ts-ignore
function Phantom({tx}) {


    const {
        provider,
        publicKey,
        disconnect,
        connect,
        status,
        sign
    } = usePhantom();
    // @ts-ignore

    console.log("provider",provider?.isPhantom)
    return (
        <div style={{margin: "auto", padding: '20px', minWidth: "487px"}}>
            <div>Phantom Wallet</div>
            <div>
                User Public key: <>{publicKey || "empty"}</>
            </div>

            <div>
                Status: {status}
            </div>
            <div>
                Is Phantom availdable: {
                // @ts-ignore
                 provider?.isPhantom}
            </div>
            <div style={{display: "flex", flexDirection: "column", margin: '15px'}}>

            {provider && !publicKey && (

                <Button
                    variant="outlined"
                    onClick={connect}
                >
                    Connect wallet
                </Button>

            )}
            <Button
                variant="outlined"
                onClick={disconnect}
            >
                Disconnect wallet
            </Button>
                <Button variant="outlined"
                        onClick={() => sign({tx, address, stakeAccountPublicKey})}>
                    Sign Current TX
                </Button>
            </div>
            {!provider && (
                <p>
                    No provider found. Install{" "}
                    <a href="https://phantom.app/">Phantom Browser extension</a>
                </p>
            )}
        </div>

    )
}

export default Phantom;
