import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
const rpcNode = 'https://hangzhounet.smartpy.io/';

// This function fetches plenty balance of any address for you.
export const fetchPlentyBalanceOfUser = async (userAddress) => {
  try {
    const Tezos = new TezosToolkit(rpcNode);
    Tezos.setProvider(rpcNode);
    const plentyContractAddress = 'KT1Mdk7TfHjbwb2ciTTsySj9gV9W9uc7HxCu';
    let userBalance = 0;
    const plentyTokenDecimal = 18;
    const plentyContractInstance = await Tezos.contract.at(
      plentyContractAddress
    );
    const storageInstance = await plentyContractInstance.storage();
    const userDetails = await storageInstance.balances.get(userAddress);
    userBalance = userDetails.balance;
    userBalance =
      userBalance.toNumber() / Math.pow(10, plentyTokenDecimal).toFixed(3);
    return {
      success: true,
      userBalance,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      userBalance: 0,
    };
  }
};

export const fetchAQBalanceOfUser = async (userAddress) => {
  try {
    const Tezos = new TezosToolkit(rpcNode);
    Tezos.setProvider(rpcNode);
    const definingArtContractAddress = 'KT1VVvsMh8pbZhVrjdZpsx6D3w9Jd7LMvkQ4';
    let userBalance = 0;
    const definingArtTokenDecimal = 18;
    const definingArtContractInstance = await Tezos.contract.at(
      definingArtContractAddress
    );
    const storageInstance = await definingArtContractInstance.storage();
    const userDetails = await storageInstance.balances.get(userAddress);
    userBalance = userDetails.balance;
    userBalance =
      userBalance.toNumber() / Math.pow(10, definingArtTokenDecimal).toFixed(3);
    return {
      success: true,
      userBalance,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      userBalance: 0,
    };
  }
};

export const fetchAQPerImageOfUser = async (userAddress, imageId) => {
  try {
    const Tezos = new TezosToolkit(rpcNode);
    Tezos.setProvider(rpcNode);
    const definingArtContractAddress = 'KT1VVvsMh8pbZhVrjdZpsx6D3w9Jd7LMvkQ4';
    const definingArtTokenDecimal = 18;
    const definingArtContractInstance = await Tezos.contract.at(
      definingArtContractAddress
    );
    const storageInstance = await definingArtContractInstance.storage();
    const imageVotes = await storageInstance.imageVoters.get(imageId);
    if(!imageVotes)
    return {
      success: true,
      userVotes: 0,
    };

    let userVotes = await imageVotes.get(userAddress);
    userVotes = userVotes.toNumber() / Math.pow(10, definingArtTokenDecimal).toFixed(3);
    return {
      success: true,
      userVotes,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      userVotes: 0,
    };
  }
};

export const releaseTodaysAQ = async () => {
  try {
    const options = {
      name: 'Test App',
    };

    const wallet = new BeaconWallet(options);
    const WALLET_RESP = await CheckIfWalletConnected(wallet);

    if (WALLET_RESP.success) {
      const account = await wallet.client.getActiveAccount();
      const userAddress = account.address;
      const Tezos = new TezosToolkit(rpcNode);
      Tezos.setRpcProvider(rpcNode);
      Tezos.setWalletProvider(wallet);
      const definingArtContractAddress = 'KT1VVvsMh8pbZhVrjdZpsx6D3w9Jd7LMvkQ4';
      const definingArtContractInstance = await Tezos.contract.at(
        definingArtContractAddress
      );
      let batch = null;
      batch = await Tezos.wallet
        .batch()
        .withContractCall(
          definingArtContractInstance.methods.releaseTodaysVPs(
            userAddress,
          )
        );
      const batchOperation = await batch.send();
      await batchOperation.confirmation();
      return {
        success: true,
        opID: batchOperation.opHash,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      opID: null,
    };
  }
};

// This function checks if the wallet is connected with app to perform any operation.

const CheckIfWalletConnected = async (wallet) => {
  try {
    const network = {
      type: 'hangzhounet',
    };
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        network,
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const voteOnImage = async (imageId, voteCount) => {
  try {
    const options = {
      name: 'Test App',
    };

    const wallet = new BeaconWallet(options);
    const WALLET_RESP = await CheckIfWalletConnected(wallet);

    if (WALLET_RESP.success) {
      const Tezos = new TezosToolkit(rpcNode);
      Tezos.setRpcProvider(rpcNode);
      Tezos.setWalletProvider(wallet);
      const definingArtContractAddress = 'KT1VVvsMh8pbZhVrjdZpsx6D3w9Jd7LMvkQ4';
      const definingArtTokenDecimal = 18;
      const definingArtContractInstance = await Tezos.contract.at(
        definingArtContractAddress
      );
      let batch = null;
      let vote = voteCount * Math.pow(10, definingArtTokenDecimal).toFixed(3)
      batch = await Tezos.wallet
        .batch()
        .withContractCall(
          definingArtContractInstance.methods.voteOnImageId(
            imageId,
            vote
          )
        );
      const batchOperation = await batch.send();
      await batchOperation.confirmation();
      return {
        success: true,
        opID: batchOperation.opHash,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      opID: null,
    };
  }
};
