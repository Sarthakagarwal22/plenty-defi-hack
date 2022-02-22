import React , { useEffect, useState } from 'react';
import { TweenLite } from 'gsap';
import { SliderEffect } from './SliderEffect';
import RangeSlider from '../Common/RangeSlider';
import './Images.css';

/*
TODO: 1.on votePerImage, if user has voted for an image, do not show the slider
2.add app background to canvas background
*/

const Images = (props)=> {
  const { item, imagesList,votePerImageLoaded,voteForImage,votePerImage } = props;
  const [effects, setEffects] = useState({
    material: {},
images: []
});

const getImageId = () =>{
  return imagesList[item]?._id
}

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
      {imagesList.map((imageObj,index) => {
        return (
          <div style={{ width: '100%', height: '100%' }} key={index} hidden={index !== item}>
            <img src={imageObj.imageSrc} className="landing__image" alt="Animal"></img>
            <div className="landing__details">
              <div className="landing__details__label">
                {'Tweet text'}
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="age" className="landing__details__text landing__details__text-small">{imageObj.text}</span>
              </div>
          </div>
        )}
      )}      
     {votePerImageLoaded ? <RangeSlider getImageId={getImageId} voteForImage={voteForImage} votePerImage={votePerImage}/> : <h2
     style={{
      position: 'fixed',
      bottom: '20px',
      textAlign: 'center',
      color:'white',
      width:'100%'
     }}>
       Loading your Votes, you can browse images till then
       </h2>}
    </div>
  )
}

export default Images;


