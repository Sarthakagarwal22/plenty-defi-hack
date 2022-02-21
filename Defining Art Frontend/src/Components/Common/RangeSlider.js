import React, {useState} from 'react';
import Slider, { createSliderWithTooltip } from "rc-slider";
import 'rc-slider/assets/index.css';
const STEP = 1;
const MIN = 0;
const MAX = 100;

const RangeSlider = ({voteForImage})=> {
    const [rangeVal,setRangeVal] = useState(0);

    const onSubmit = () =>{
      voteForImage(rangeVal);
    }
  return (
    <div style={{ marginLeft: '27rem', display:'flex', flexDirection:'column'}}>
        <p style={{color:'white'}}>{rangeVal}</p>
     <Slider
      style={{width:'140%'}}
          min={MIN}
          max={MAX}
          value={rangeVal}
          onChange={(val)=>{
            setRangeVal(val)
          }}
          railStyle={{
            height: 10
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
        />
        <button
        onClick={onSubmit}
        style={{marginTop:'0.2rem', width:'6rem', marginLeft:'6rem'}}
        >
          Submit
          </button>
    </div>
  )
}

export default RangeSlider