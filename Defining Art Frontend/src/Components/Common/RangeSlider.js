import React, {useState} from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
const MIN = 0;
const MAX = 100;

const RangeSlider = ({voteForImage,imageId,votePerImage})=> {
    const [rangeVal,setRangeVal] = useState(0);
    const onSubmit = () =>{
      voteForImage(imageId,rangeVal);
    }
    if(!votePerImage[imageId])
  return (
    <div style={{
      left: '28%',
    position: 'fixed',
    bottom: '10px',
    width: '55%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    }}>
      
     <Slider
      style={{}}
          min={MIN}
          max={MAX}
          value={rangeVal}
          onChange={(val)=>{
            setRangeVal(val)
          }}
          railStyle={{
            height: 6
          }}
          handleStyle={{
            height: 28,
            width: 28,
            // marginLeft: -14,
            // marginTop: -14,
            // backgroundColor: "black",
            border: 0
          }}
          trackStyle={{
            background: "none"
          }}
          dotStyle={{
            display:'flex',
            alignItems:'center',
            alignSelf:'center'
          }}
        />
          <p style={{color:'white', marginLeft:'10px'}}>{rangeVal}</p>
        <div>
        <button
        onClick={onSubmit}
        style={{fontSize: '1rem',
          width: '7rem',
          color: 'white',
          background: '#6202ef',
          borderRadius: '5px',
          padding: '10px',
          marginLeft: '10px',
          border: 'none',
          fontWeight: 'bold',
        }}
        >
          Submit
          </button>
          </div>
    </div>
  )
  else 
  return(
    <h2 style={{
      position: 'fixed',
      bottom: '20px',
      textAlign: 'center',
      color:'white',
      width:'100%'
    }}>
      {`You Have already voted ${votePerImage[imageId]} AQ on this image`}
    </h2>
  )
}

export default RangeSlider