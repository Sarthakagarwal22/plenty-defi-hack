import React,{useEffect,useState} from 'react';

import {useWalletAddress} from '../../Context/walletContext';
import {fetchPlentyBalanceOfUser, fetchAQBalanceOfUser} from '../../taquito-functions';

import bg from '../../assets/images/bg.jpg';
import refreshIcon from '../../assets/images/refresh.svg';
import './homepage.css';

const Homepage = () => {

    const walletAddress = useWalletAddress();
    const [plentyBalance, setPlentyBalance] = useState();
    const [loading, setLoading] = useState(true);

    const [AQBalance, setAQBalance] = useState();
    const [aQloading, setAQLoading] = useState(true);

    const fetchPlentyBalance = async () => {
        setLoading(true);
        try{
            const response = await fetchPlentyBalanceOfUser(walletAddress);
            setPlentyBalance(response.userBalance);
        }catch(e){
            setPlentyBalance(0);
        }finally{
            setLoading(false);
        }
    }
    
    const fetchAQBalance = async () => {
        setAQLoading(true);
        try{
            const response = await fetchAQBalanceOfUser(walletAddress);
            setAQBalance(response.userBalance);
        }catch(e){
            setPlentyBalance(0);
        }finally{
            setAQLoading(false);
        }
    }

    useEffect(() => {
        fetchPlentyBalance();
        fetchAQBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                <a href="/vote" target="_blank" rel="noreferrer">
                <button type="button" className="button" >
                    Start Voting
                </button>
                </a>
                </div>
                <br /><br />                
            </div>
        </div>
    )
}

export default Homepage;