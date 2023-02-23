import React, {useEffect, useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import {getStakeAccounts} from "./hooks/api/solana/getStakeAccounts";
import {delegate} from "./hooks/api/solana/delegate";
import {useLedgerCosmosWallet} from "./hooks/useSolana";
import {withdraw} from "./hooks/api/solana/withdraw";
import {createStakeAccount} from "./hooks/api/solana/createStakeAccount";
import {deactivate} from "./hooks/api/solana/deactivate";
import {clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import BN from 'bn.js';
import { Buffer } from 'buffer';
import TransactionsCreate from "./components/TransactionsCreate";

// @ts-ignore
window.Buffer = Buffer;

const address = "AychGHrhbq8PxKdPmwXMYALwmGcKAbFHdrA2YnW5Q3JA"
// const stakeAccountPublicKey = "HhjejLGRmGoGbH4XN8UquMKMH3BiZZ5mJLyBaCkZPLer";
const stakeAccountPublicKey = '4rPRsVNdCF27sq7PAv9iTWaTNZH1QhioTrXSo19Azd1h';


function App() {


   return(
       <TransactionsCreate/>
   )
}

export default App;
