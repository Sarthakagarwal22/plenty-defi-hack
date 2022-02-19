import {useState, useEffect} from 'react';
// import axios from 'axios';

import {useWalletAddress} from '../../Context/walletContext';
// import {fetchAQBalanceOfUser, voteOnImage} from '../../taquito-functions';
import {fetchAQBalanceOfUser} from '../../taquito-functions';

import refreshIcon from '../../assets/images/refresh.svg';
import './vote.css';

// const apiBaseUrl = 'https://defining-art.herokuapp.com';

const Vote = (props) => {

    const walletAddress = useWalletAddress();
    // const [imagesArray, setImagesArray] = useState([]);
    // const [loadingArray, setLoadingArray] = useState(true);
    const [AQBalance, setAQBalance] = useState();
    const [aQloading, setAQLoading] = useState(true);


    const fetchAQBalance = async () => {
        setAQLoading(true);
        try{
            const response = await fetchAQBalanceOfUser(walletAddress);
            setAQBalance(response.userBalance);
            console.log("response.userBalance", response.userBalance)
        }catch(e){
            setAQBalance(0);
        }finally{
            setAQLoading(false);
        }
    }

    // const voteForImage = async (imageId, voteCount) => {
    //     if(AQBalance < voteCount){
    //         alert('You do not have enough AQ to vote');
    //         return;
    //     }
        
    //     await voteOnImage(imageId, voteCount);
    //     setAQBalance(AQBalance - voteCount);
    // }

    // const getImagesArray = async () => {
    //     try{
    //         // const imagesArray = await axios.get(`${apiBaseUrl}/images/getImagesArray`);
    //         setImagesArray([]);
    //         // setImagesArray(imagesArray.data.imagesArray);
    //     }catch(e){
    //         setImagesArray([]);
    //     }finally{
    //         setLoadingArray(false);
    //     }
    // }

    useEffect(() => {
        if(!walletAddress){
            window.location.href = '/';
            return;
        }
        // getImagesArray();
        fetchAQBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="voting-container">
            <h3 className="container-header">Let's Get Voting</h3>
            <div className="aq">
                <div className="aq-container">
                    Total AQ : {aQloading ? 'loading...' : AQBalance}
                </div>
                {!aQloading && <span onClick={fetchAQBalance} style={{cursor:'pointer'}}><img src={refreshIcon} alt="refresh" /></span>}
            </div>
            <div className="voting-images-container"></div>
        </div>
    )

}

export default Vote;