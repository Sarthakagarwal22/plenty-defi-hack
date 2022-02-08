import React, { useEffect, useState } from 'react';
import {
  ConnectWalletAPI,
  DisconnectWalletAPI,
  FetchWalletAPI,
} from './beacon-functions';

import {useWalletAddressUpdate} from './Context/walletContext';
import { fetchPlentyBalanceOfUser, transferPlenty } from './taquito-functions';

import ConnectWallet from './Components/ConnectWallet/ConnectWallet';
import Homepage from './Components/Homepage/homepage';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [plentyHolderAddress, setPlentyHolderAddress] = useState('');
  const [plentyHolderBalance, setPlentyHolderBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);
  const updateWalletAddress = useWalletAddressUpdate()

  useEffect(() => {
    FetchWalletAPI().then((resp) => {
      setWalletAddress(resp.wallet);
      updateWalletAddress(resp.wallet);
    });
  }, []);

  const plentyHolderInputHandler = (value) => {
    setPlentyHolderAddress(value);
  };

  const amountInputHandler = (value) => {
    setAmount(parseFloat(value));
  };

  const receiverAddressInputHandler = (value) => {
    setReceiverAddress(value);
  };

  const transferPlentyHandler = () => {
    setTransferLoading(true);
    transferPlenty(amount, receiverAddress)
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          alert('Transfer Successfull with operation Id: ' + resp.opID);
          setTransferLoading(false);
        } else {
          alert('Transfer Failed');
          setTransferLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Some error occured');
        setTransferLoading(false);
      });
  };

  const fetchBalanceHandler = () => {
    setBalanceLoading(true);
    fetchPlentyBalanceOfUser(plentyHolderAddress)
      .then((resp) => {
        console.log(resp.userBalance);
        alert('Plenty Balance is ' + resp.userBalance);
        setBalanceLoading(false);
        setPlentyHolderBalance(resp.userBalance);
      })
      .catch((err) => {
        console.log(err);
        setBalanceLoading(false);
        alert('Plenty Balance is ' + 0);
        setPlentyHolderBalance(0);
      });
  };

  const connectWalletHandler = () => {
    ConnectWalletAPI()
      .then((resp) => {
        setWalletAddress(resp.wallet);
        updateWalletAddress(resp.wallet);
      })
      .catch((err) => {
        console.log(err);
        setWalletAddress('');
        updateWalletAddress('');
      });
  };

  return (
    <div className="App">
      {!walletAddress ? (
        <ConnectWallet clickHandler={connectWalletHandler} />
      ) : (
        <>
        <Homepage />
        </>
      )
      }
      {/* <hr />
      <h1>Get Plenty Balance of User</h1>
      <input
        placeholder={'address'}
        onChange={(event) => plentyHolderInputHandler(event.target.value)}
      />
      <button onClick={fetchBalanceHandler}>Get Balance</button>
      {balanceLoading ? <p>...Loading</p> : null}
      <hr />
      <h1>Transfer Plenty</h1>
      <input
        placeholder="amount"
        onChange={(event) => amountInputHandler(event.target.value)}
      />
      <input
        placeholder="receiver"
        onChange={(event) => receiverAddressInputHandler(event.target.value)}
      />
      <button onClick={transferPlentyHandler}>Send Plenty</button>
      {transferLoading ? <p>...Loading</p> : null} */}
    </div>
  );
}

export default App;
