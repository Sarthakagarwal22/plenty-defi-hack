import React from 'react';

import bg from '../../assets/images/bg.jpg';

import './homepage.css';

const Homepage = () => {

    return(
        <div className="homepage-main-container">
            <div className="left-container">
                <br /><br /><br />
                <div className="left-header"> Staking </div>
            </div>
            <div className="right-container">
                <img className="background-image" src={bg} alt="background" />
            </div>
        </div>
    )
}

export default Homepage;