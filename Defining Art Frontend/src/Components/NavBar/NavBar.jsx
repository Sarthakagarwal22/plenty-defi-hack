import React from 'react';

import {DisconnectWalletAPI} from '../../beacon-functions';
import {useWalletAddress, useWalletAddressUpdate} from '../../Context/walletContext'

import './navbar.css';


const Navbar = () => {

    const walletAddress = useWalletAddress();
    const updateWalletAddress = useWalletAddressUpdate();

    const disconnectWalletHandler = () => {
        DisconnectWalletAPI().then((resp) => {
          updateWalletAddress('');
          window.location.reload();
        });
    };

    const formatWalletAddress = (address) => {
        return address.substring(0, 5) + '...' + address.substring(address.length - 5, address.length);
    }

    return(
        <div className="bar-container row">
            <div className="left-content">DeFining Art</div>
            {walletAddress ?
                <div className="right-content">
                    <span className="wallet-address">Wallet Address: {formatWalletAddress(walletAddress)}</span>
                    <button className="btn btn-primary" onClick={disconnectWalletHandler}>Disconnect Wallet</button>
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default Navbar;