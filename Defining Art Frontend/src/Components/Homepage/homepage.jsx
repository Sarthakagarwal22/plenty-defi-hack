import React,{useEffect,useState} from 'react';

import {useWalletAddress} from '../../Context/walletContext';
import {fetchPlentyBalanceOfUser} from '../../taquito-functions';

import bg from '../../assets/images/bg.jpg';
import './homepage.css';

const Homepage = () => {

    const walletAddress = useWalletAddress();
    const [plentyBalance, setPlentyBalance] = useState();

    useEffect(() => {
        const fetchPlentyBalance = async () => {
            const response = await fetchPlentyBalanceOfUser(walletAddress);
            setPlentyBalance(response.userBalance);
        }
        fetchPlentyBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="homepage-main-container">
            <div className="left-container">
                <div className="left-header"> Staking </div>
                <br />
                <div className="left-description"> Stake PLENTY, receive xPLENTY. Get Artistic Quotient (AQ) equal to xPLENTY. Vote for all your favourite art. Higher AQ, Higher chances of Image being auctioned</div>
                <div className="buttons-container">
                <a href="https://plentydefi.com/stake" target="_blank" rel="noreferrer">
                <button type="button" className="button" >
                    Stake PLENTY
                </button>
                </a>
                <a href="https://plentydefi.com/stake" target="_blank" rel="noreferrer">
                <button type="button" className="unstake_xplenty button">
                    <span>Unstake xPLENTY</span>
                </button>
                </a>
                </div>
                <br /><br />
                { walletAddress && (plentyBalance !== undefined) && 
                    <div className="left-description">You have {plentyBalance} PLENTY to stake and get more xPLENTY</div>
                }
                
            </div>
            <div className="right-container">
                <img className="background-image" src={bg} alt="background" />
            </div>
        </div>
    )
}

export default Homepage;