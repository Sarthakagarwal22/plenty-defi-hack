import {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

import {useWalletAddress, useWalletAddressLoadingContext} from '../../Context/walletContext';
import {fetchAQBalanceOfUser, voteOnImage, fetchAQPerImageOfUser} from '../../taquito-functions';
import ImagesComponent from '../ImagesComponent'
import refreshIcon from '../../assets/images/refresh.svg';
import './vote.css';

const apiBaseUrl = 'https://defining-art.herokuapp.com';

const Vote = (props) => {

    const walletAddress = useWalletAddress();
    const walletAddressLoading = useWalletAddressLoadingContext();
    const [imagesArray, setImagesArray] = useState([]);
    const [loadingImageArray, setLoadingImageArray] = useState(true);
    const [AQBalance, setAQBalance] = useState();
    const [aQloading, setAQLoading] = useState(false);
    const [votePerImage, setVotePerImage] = useState();
    const [votePerImageLoaded, setVotePerImageLoaded] = useState(false);

    const fetchAQBalance = async () => {
        if(aQloading)
        return;

        setAQLoading(true);
        try{
            const response = await fetchAQBalanceOfUser(walletAddress);
            setAQBalance(response.userBalance);
        }finally{
            setAQLoading(false);
        }
    }
    
    const getVotesPerImagesArray = async (imagesArray) => {
        setVotePerImageLoaded(false);
        const votePerImage = {}
        try{
            for(let i = 0; i < imagesArray.length; i++){
                const response = await fetchAQPerImageOfUser(walletAddress, imagesArray[i]._id.toString());
                votePerImage[imagesArray[i]._id] = response.userVotes;
            }
        }finally{
            setVotePerImage(votePerImage);
            setVotePerImageLoaded(true);
            console.log(votePerImage)
        }
    }

    const voteForImage = async (imageId, voteCount) => {
        if(!imageId || !voteCount)
            return;
        if(AQBalance < voteCount){
            alert('You do not have enough AQ to vote');
            return;
        }
        
        try{
            await voteOnImage(imageId, voteCount);
            setAQBalance(AQBalance - voteCount);
            const newVotePerImage = {...votePerImage};
            newVotePerImage[imageId] = voteCount;
            setVotePerImage(newVotePerImage);
        }catch(e){
            alert('Error while voting, please try again');
        }
    }

    const getImagesArray = async () => {
        try{
            const imagesArray = await axios.post(`${apiBaseUrl}/images/getGeneratedImages`, {
                date: moment().subtract(2, 'days').format('MM-DD')
            });
            setImagesArray(imagesArray.data.imageDetails);
        }finally{
            setLoadingImageArray(false);
        }
    }

    useEffect(() => {
        if(!walletAddressLoading && !walletAddress){
            window.location.href = '/';
            return;
        }
        else if(!walletAddressLoading && walletAddress){
            getImagesArray();
            fetchAQBalance();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[walletAddressLoading, walletAddress]);

    useEffect(() => {
        if(!imagesArray.length){
            return
        }
        getVotesPerImagesArray(imagesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[imagesArray])

    return (
        <div className="voting-container">
            <h1 className="container-header">Let's Get Voting</h1>
            <div className="aq">
                <div className="aq-container">
                    Total AQ : {aQloading ? 'loading...' : AQBalance}
                </div>
                {!aQloading && <span onClick={fetchAQBalance} style={{cursor:'pointer'}}><img src={refreshIcon} alt="refresh" /></span>}
            </div>
            {loadingImageArray ? <div className="loading-container">Loading Images...</div> : 
                imagesArray.length ? 
                    <ImagesComponent 
                        imagesList={imagesArray} 
                        voteForImage={voteForImage}
                        votePerImage={votePerImage}
                        votePerImageLoaded={votePerImageLoaded}
                    />
                    :
                    <div className="loading-container">Couldn't Load Images</div>
            }
        </div>
    )

}

export default Vote;