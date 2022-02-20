import React , { useEffect, useState } from 'react';
import { TweenLite } from 'gsap';
import { SliderEffect } from './SliderEffect';
import RangeSlider from '../Common/RangeSlider';
import './Images.css';

const SingleImage = (props)=>{
  const {animal, index, item } = props;



  return(
    <div style={{ width: '80%', height: '80%' }} key={index} hidden={index !== item}>
            <img src={animal.url} className="landing__image" alt="Animal"></img>
            <div className="landing__details">
              {/* <div className="landing__details__label">
                SPECIES
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="title" className="landing__details__text landing__details__text-hidden">{animal.species}</span> */}
              <div className="landing__details__label">
                TWEET
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="age" className="landing__details__text landing__details__text-small">{'This is tweet'}</span>
              {/* <div className="landing__details__label">
                BIO
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="bio" className="landing__details__text landing__details__text-small">{animal.bio}</span> */}
            </div>
           
          </div>
  )
}

{/* Images = Landing component */}

const Images = (props)=> {
  const { item, imagesList } = props;
  const [effects, setEffects] = useState({
    material: {},
images: []
});

  useEffect(() => {
    const parent = document.querySelector('.landing');
    const images = document.querySelectorAll('.landing__image');

    if (parent && images) {
      const effects = SliderEffect({
        parent,
        images: Array.from(images)
      });
      setEffects(effects);
    }
  }, []);

  useEffect(() => {
    if (effects && effects?.material && effects?.material?.uniforms?.nextImage?.value) {
      effects.material.uniforms.nextImage.value = effects.images[item];
      TweenLite.to(effects.material.uniforms.dispFactor, 1, {
        value: 1,
        ease: 'Expo.easeOut',
        onComplete: () => {
          effects.material.uniforms.currentImage.value = effects.images[item];
          effects.material.uniforms.dispFactor.value = 0.0;
        }
      });
    }
  }, [item, effects]);


  return (
     <div className="landing">
      { imagesList.map((animal, index) => {
        return <> <SingleImage
        animal = {animal}
        index = {index}
         item = {item}
        />
        </>
      })}
               <RangeSlider/>
    </div>
  )
}

export default Images;


