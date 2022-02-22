import React , { useState } from 'react';
import Slider from './Slider';
import Images from './Images';
import './ImagesComponent.css';

const ImagesComponent = (props)=>{
    const {imagesList} = props;
    const [item, setItem] = useState(0);
    return(
        <div>
        <Images item={item} {...props} />
        <Slider onItem={(index) => setItem(index)} size={imagesList.length}></Slider>
      </div>
    )
}


export default ImagesComponent;