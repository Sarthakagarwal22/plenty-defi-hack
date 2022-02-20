import React , { useEffect, useState } from 'react';
import Slider from './Slider';
import Images from './Images';
import './ImagesComponent.css';

const ImagesComponent = ()=>{
    const [item, setItem] = useState(0);
    const list = [
      {
        species: 'Amur Leopard',
        age: 2,
        bio: 'Love snacks',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg'
      },
      {
        species: 'Asiatic Lion',
        age: 8,
        bio: 'Love shrimps',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
      },
      {
        species: 'Siberian Tiger',
        age: 9,
        bio: 'Hate Elefants',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
      },
      {
        species: 'Brown Bear',
        age: 12,
        bio: 'Love salmon',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg'
      },
      {
        species: 'Siberian Tiger',
        age: 9,
        bio: 'Hate Elefants',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
      },
      {
        species: 'Asiatic Lion',
        age: 8,
        bio: 'Love shrimps',
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
      },
    ]

    return(
        <div>
        {/* Images = Landing component */}
        <Images animals={list} item={item}/>
        <Slider onItem={(index) => setItem(index)} size={list.length}></Slider>
      </div>
    )
}


export default ImagesComponent;