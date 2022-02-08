import React,{useContext, useState} from 'react';

const WalletAddressContext = React.createContext();
const WalletAddressUpdateContext = React.createContext();

export function useWalletAddress(){
    return useContext(WalletAddressContext);
}

export function useWalletAddressUpdate(){
    return useContext(WalletAddressUpdateContext);
}

export function WalletAddressProvider({children}){
    const [walletAddress, setWalletAddress] = useState('');

    const setUpdateWalletAddress = (newWalletAddress) => {
        setWalletAddress(newWalletAddress);
    }

    return (
        <WalletAddressContext.Provider value={walletAddress}>
            <WalletAddressUpdateContext.Provider value={setUpdateWalletAddress}>
                {children}
            </WalletAddressUpdateContext.Provider>
        </WalletAddressContext.Provider>
    );
}