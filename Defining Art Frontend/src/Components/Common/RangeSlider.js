import React, {useState} from 'react';
import Slider, { createSliderWithTooltip } from "rc-slider";
import 'rc-slider/assets/index.css';
const STEP = 1;
const MIN = 0;
const MAX = 10;

const RangeSlider = (props)=> {
    const [rangeVal,setRangeVal] = useState(0)
  return (
    <div style={{ marginLeft: '43rem'}}>
        <p style={{color:'white'}}>{rangeVal}</p>
     <Slider
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
    </div>
  )
}

export default RangeSlider