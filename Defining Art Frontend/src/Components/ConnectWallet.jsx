import React from 'react';

const ConnectWallet = () => {
    return(
        <div class="left-container center col-sm-12">
            <div>
                <img draggable="false" class="background-image" src="/assets/images/art-4.jpg" alt="background" />
            </div>
            <div class="icon-container hide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12C1 14.9174 2.15893 17.7153 4.22183 19.7782C6.28473 21.8411 9.08262 23 12 23C14.9174 23 17.7153 21.8411 19.7782 19.7782C21.8411 17.7153 23 14.9174 23 12C23 9.08262 21.8411 6.28473 19.7782 4.22183C17.7153 2.15893 14.9174 1 12 1C9.08262 1 6.28473 2.15893 4.22183 4.22183C2.15893 6.28473 1 9.08262 1 12V12Z" stroke="#1C1C1C"></path><path d="M12 16.5V7" stroke="#1C1C1C"></path>
                </svg>
            </div>
            <div class="title big">Connect Wallet</div>
            <div class="description" style={{maxWidth: "600px;"}}>Connect your wallet to access the full version of Botto. If you are unsure how to participate, please head on over to our beginner’s documentation.</div>
            <div class="buttons-container">
                <button type="button" class="button white buttonRipple btn btn-primary" style={{marginRight: "24px;"}}>
                    <span>Connect Wallet</span>
                </button>
                <a href="https://botto.com/" target="_blank" rel="noreferrer">
                    <button type="button" class="button      softTransp      buttonRipple btn btn-primary">
                        <span>Learn More</span>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default ConnectWallet;