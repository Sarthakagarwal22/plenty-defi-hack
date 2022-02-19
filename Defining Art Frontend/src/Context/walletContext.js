import React,{useContext, useEffect, useState} from 'react';
import { FetchWalletAPI } from '../beacon-functions';
const WalletAddressContext = React.createContext();
const WalletAddressLoadingContext = React.createContext();
const WalletAddressUpdateContext = React.createContext();

export function useWalletAddress(){
    return useContext(WalletAddressContext);
}

export function useWalletAddressUpdate(){
    return useContext(WalletAddressUpdateContext);
}

export function useWalletAddressLoadingContext(){
    return useContext(WalletAddressLoadingContext)
}

export function WalletAddressProvider({children}){
    const [walletAddress, setWalletAddress] = useState('');
    const [loadingWalletAddress, setLoadingWalletAddress] = useState(true);

    const setUpdateWalletAddress = (newWalletAddress) => {
        setWalletAddress(newWalletAddress);
    }

    useEffect(() => {
        FetchWalletAPI().then((resp) => {
            setWalletAddress(resp.wallet);
            setLoadingWalletAddress(false);
        });
    },[]);

    return (
        <WalletAddressContext.Provider value={walletAddress}>
            <WalletAddressUpdateContext.Provider value={setUpdateWalletAddress}>
                <WalletAddressLoadingContext.Provider value={loadingWalletAddress}>
                    {children}
                </WalletAddressLoadingContext.Provider>
            </WalletAddressUpdateContext.Provider>
        </WalletAddressContext.Provider>
    );
}