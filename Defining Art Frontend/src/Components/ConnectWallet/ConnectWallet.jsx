import React from 'react';
import bg from '../../assets/images/bg.jpg';

import './connectWallet.css';

const ConnectWallet = ({clickHandler}) => {
    return(
        <div className="left-container center col-sm-12">
            <img className="background-image" src={bg} alt="background" />
            <div className="title big">Connect Wallet</div>
            <br />
            <div className="description">Connect your wallet to access the full version of DeFining Art. If you are unsure how to participate, please head on over to our beginner’s documentation.</div>
            <br /><br />
            <div className="buttons-container">
                <button type="button" className="button" onClick={clickHandler}>
                    Connect Wallet
                </button>
                <button type="button" className="button disabled" disabled>
                    <span>Learn More</span>
                </button>
            </div>
        </div>
    )
}

export default ConnectWallet;