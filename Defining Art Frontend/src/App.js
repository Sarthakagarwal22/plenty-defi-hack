import React, { useEffect, useState } from 'react';
import {
  ConnectWalletAPI,
  FetchWalletAPI,
} from './beacon-functions';

import {useWalletAddressUpdate} from './Context/walletContext';

import ConnectWallet from './Components/ConnectWallet/ConnectWallet';
import Homepage from './Components/Homepage/homepage';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const updateWalletAddress = useWalletAddressUpdate()

  useEffect(() => {
    FetchWalletAPI().then((resp) => {
      setWalletAddress(resp.wallet);
      updateWalletAddress(resp.wallet);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
