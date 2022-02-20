import React , { useEffect, useState } from 'react';
import Slider from './Slider';
import Images from './Images';
import './ImagesComponent.css';

const ImagesComponent = ()=>{
    const [item, setItem] = useState(0);
    const imagesList = [
      // {
      //   species: 'Amur Leopard',
      //   age: 2,
      //   bio: 'Love snacks',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg'
      // },
      // {
      //   species: 'Asiatic Lion',
      //   age: 8,
      //   bio: 'Love shrimps',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
      // },
      // {
      //   species: 'Siberian Tiger',
      //   age: 9,
      //   bio: 'Hate Elefants',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
      // },
      // {
      //   species: 'Brown Bear',
      //   age: 12,
      //   bio: 'Love salmon',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg'
      // },
      // {
      //   species: 'Siberian Tiger',
      //   age: 9,
      //   bio: 'Hate Elefants',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
      // },
      // {
      //   species: 'Asiatic Lion',
      //   age: 8,
      //   bio: 'Love shrimps',
      //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
      // },
        {
            id: "1234567898765",
            imgSrc: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg",
            text: "Happy Birthday",
        },
        {
            id: "24567",
            imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg',
            text: "Happy Birthday",
        },
        {
            id: "3",
            imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg',
            text: "Happy Birthday",
        },
        {
            id: "4",
            imgSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg',
            text: "Happy Birthday",
        },
    ]

    return(
        <div>
        <Images imagesList={imagesList} item={item}/>
        <Slider onItem={(index) => setItem(index)} size={imagesList.length}></Slider>
      </div>
    )
}


export default ImagesComponent;