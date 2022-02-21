import {useState, useEffect} from 'react';
// import axios from 'axios';

import {useWalletAddress, useWalletAddressLoadingContext} from '../../Context/walletContext';
// import {fetchAQBalanceOfUser, voteOnImage, fetchAQPerImageOfUser} from '../../taquito-functions';
import {fetchAQBalanceOfUser} from '../../taquito-functions';
import ImagesComponent from '../ImagesComponent'
import refreshIcon from '../../assets/images/refresh.svg';
import './vote.css';

// const apiBaseUrl = 'https://defining-art.herokuapp.com';

const Vote = (props) => {

    const walletAddress = useWalletAddress();
    const walletAddressLoading = useWalletAddressLoadingContext();
    const [imagesArray, setImagesArray] = useState([]);
    // const [loadingArray, setLoadingArray] = useState(true);
    const [AQBalance, setAQBalance] = useState();
    const [aQloading, setAQLoading] = useState(true);
    // const [votePerImage, setVotePerImage] = useState();
    // const [votePerImageLoaded, setVotePerImageLoaded] = useState(false);

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
    
    // const getVotesPerImagesArray = async (imagesArray) => {
    //     setVotePerImageLoaded(false);
    //     const votePerImage = {}
    //     try{
    //         for(let i = 0; i < imagesArray.length; i++){
    //             const response = await fetchAQPerImageOfUser(walletAddress, imagesArray[i].id.toString());
    //             votePerImage[imagesArray[i].id] = response.userVotes;
    //         }
    //     }finally{
    //         setVotePerImage(votePerImage);
    //         setVotePerImageLoaded(true);
    //     }
    // }

    // const voteForImage = async (imageId, voteCount) => {
    //     if(AQBalance < voteCount){
    //         alert('You do not have enough AQ to vote');
    //         return;
    //     }
        
    //     await voteOnImage(imageId, voteCount);
    //     setAQBalance(AQBalance - voteCount);
    // }

    const getImagesArray = async () => {
        try{
            // const imagesArray = await axios.get(`${apiBaseUrl}/images/getImagesArray`);
            const imagesArray = [
                {
                    id: "1234567898765",
                    imgSrc: "https://bafybeicf3hrgqegex6uxm5p5cdvk5okvm2y7m7kjtckhafs6nqysr5cspa.ipfs.dweb.link/ai.png",
                    text: "Happy Birthday",
                },
                {
                    id: "24567",
                    imgSrc: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg",
                    text: "Happy Birthday",
                },
                {
                    id: "3",
                    imgSrc: "https://bafybeicf3hrgqegex6uxm5p5cdvk5okvm2y7m7kjtckhafs6nqysr5cspa.ipfs.dweb.link/ai.png",
                    text: "Happy Birthday",
                },
                {
                    id: "4",
                    imgSrc: "https://bafybeicf3hrgqegex6uxm5p5cdvk5okvm2y7m7kjtckhafs6nqysr5cspa.ipfs.dweb.link/ai.png",
                    text: "Happy Birthday",
                },
                // {
                //             id: "1234567898765",
                //             imgSrc: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg",
                //             text: "Happy Birthday",
                //         },
                //         {
                //             id: "24567",
                //             imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg',
                //             text: "Happy Birthday",
                //         },
                //         {
                //             id: "3",
                //             imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg',
                //             text: "Happy Birthday",
                //         },
                //         {
                //             id: "4",
                //             imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg',
                //             text: "Happy Birthday",
                //         },
            ].slice()
            setImagesArray(imagesArray);
            // setImagesArray(imagesArray.data.imagesArray);
        }finally{
            // setLoadingArray(false);
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
        console.log(imagesArray)
        if(!imagesArray.length){
            return
        }
        // getVotesPerImagesArray(imagesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[imagesArray])

    return (
        <div className="voting-container">
            <h2 className="container-header">Let's Get Voting</h2>
            <div className="aq">
                <div className="aq-container">
                    Total AQ : {aQloading ? 'loading...' : AQBalance}
                </div>
                {!aQloading && <span onClick={fetchAQBalance} style={{cursor:'pointer'}}><img src={refreshIcon} alt="refresh" /></span>}
            </div>
            {imagesArray.length ? 
                <ImagesComponent imagesList={imagesArray} />
                // <ImagesComponent />
                :
                (null)
            }
        </div>
    )

}

export default Vote;