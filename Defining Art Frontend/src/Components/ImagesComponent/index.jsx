import React , { useEffect, useState } from 'react';
import Slider from './Slider';
import Images from './Images';
import './ImagesComponent.css';

const ImagesComponent = (props)=>{
    const {imagesList,votePerImageLoaded,votePerImage,voteForImage} = props;
    const [item, setItem] = useState(0);
    return(
        <div>
        <Images imagesList={imagesList} item={item} votePerImageLoaded={votePerImageLoaded} voteForImage={voteForImage} votePerImage={votePerImage}/>
        <Slider onItem={(index) => setItem(index)} size={imagesList.length}></Slider>
      </div>
    )
}


export default ImagesComponent;