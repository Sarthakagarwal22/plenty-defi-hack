import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {useWalletAddress, useWalletAddressLoadingContext} from '../../Context/walletContext';
import {fetchPlentyBalanceOfUser, fetchAQBalanceOfUser, releaseTodaysAQ} from '../../taquito-functions';

import bg from '../../assets/images/bg.jpg';
import refreshIcon from '../../assets/images/refresh.svg';
import './homepage.css';

const Homepage = () => {

    const walletAddress = useWalletAddress();
    const walletAddressLoading = useWalletAddressLoadingContext();

    const navigate = useNavigate();
    const [plentyBalance, setPlentyBalance] = useState();
    const [loading, setLoading] = useState(false);

    const [AQBalance, setAQBalance] = useState();
    const [aQloading, setAQLoading] = useState(false);

    const [AQReleaseLoading, setAQReleaseLoading] = useState(false);

    const fetchPlentyBalance = async () => {
        if(loading)
        return;

        setLoading(true);
        try{
            const response = await fetchPlentyBalanceOfUser(walletAddress);
            setPlentyBalance(response.userBalance);
        }finally{
            setLoading(false);
        }
    }
    
    const fetchAQBalance = async () => {
        if(loading)
        return;

        setAQLoading(true);
        try{
            const response = await fetchAQBalanceOfUser(walletAddress);
            setAQBalance(response.userBalance);
        }finally{
            setAQLoading(false);
        }
    }

    const releaseVpAndFetchAQBalance = async () => {
        if(AQReleaseLoading)
        return;

        try{
            setAQReleaseLoading(true);
            await releaseTodaysAQ();
            await fetchAQBalance();
        }finally{
            setAQReleaseLoading(false);
        }
    }

    useEffect(() => {
        if(!walletAddressLoading && walletAddress){
            fetchPlentyBalance();
            fetchAQBalance();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[walletAddressLoading, walletAddress])

    return(
        <div className="homepage-main-container">
            <div className="left-container">
                <div className="left-header"> Staking </div>
                <br />
                <div className="left-description"> Stake PLENTY, receive xPLENTY. Get Artistic Quotient (AQ) equal to xPLENTY. Vote for all your favourite art. Higher AQ, Higher chances of Image being auctioned. Your AQ have a validity of one day</div>
                <div className="buttons-container">
                <button type="button" className="button" onClick={() => window.open('https://plentydefi.com/stake', 'blank')}>
                    Stake PLENTY
                </button>

                <button type="button" className="unstake_xplenty button" onClick={() => window.open('https://plentydefi.com/stake', 'blank')}>
                    <span>Unstake xPLENTY</span>
                </button>
                </div>
                <br /><br />
                { walletAddress && 
                    <div className="left-description">You have {loading ? 'loading...' : plentyBalance} PLENTY {!loading && <span onClick={fetchPlentyBalance} style={{cursor:'pointer'}}><img src={refreshIcon} alt="refresh" /></span>} to stake and get more xPLENTY</div>
                }
                
            </div>
            <div className="right-container">
                <img className="background-image" src={bg} alt="background" />
                <div className="aq-container">
                    Total AQ : {aQloading ? 'loading...' : AQBalance}
                </div>
                {!aQloading && <span onClick={fetchAQBalance} style={{cursor:'pointer'}}><img src={refreshIcon} alt="refresh" /></span>}
                <div className="right-header"> Voting </div>
                <br />
                <div className="right-description">View all the images and then vote on each image, as many AQ (upto 100) you like, depending upon how much artistic do you find the image to be. You can not update your vote. New images every day.</div>
                <div className="buttons-container">
                <button type="button" className="button" onClick={releaseVpAndFetchAQBalance}>
                    {!AQReleaseLoading ? "Get Today's AQ" : 'Releasing AQ...'}
                </button>
                <button type="button" className="unstake_xplenty button" onClick={() => navigate('/vote')}>
                    Start Voting
                </button>
                </div>
                <br /><br />                
            </div>
        </div>
    )
}

export default Homepage;