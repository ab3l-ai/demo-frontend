import { ethers } from 'ethers';
import { setAccount, setWeb3, clearAccount, setSmartContract } from '@/store/walletSlice';
import { AppDispatch } from '@/store/store';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import { Temp_ContractABI, Temp_ContractAddr} from '@/contracts/temp_contract';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function numberToHex(n:any) {
    if (typeof n !== 'number') {
      throw new Error('Input must be a number');
    }
    return '0x' + n.toString(16);
}

export const connectWallet = async (dispatch: AppDispatch) => {
  if (window.ethereum) {
    try {
        try{
            await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: numberToHex(12837123) }],
            });
        }catch (switchError:any) {
            // console.log(switchError);
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await (window as any).ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: numberToHex(12837123),
                                chainName: 'Z_Ether',
                                rpcUrls: ['https://beta.zeusd.xyz/rpc'] ,
                                nativeCurrency: {
                                    decimals: 18,
                                    name: 'ZeETH',
                                    symbol: 'ZeETH'
                                }
                            },
                        ],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }

        // const accounts = await window.ethereum.request(
        //     { method: 'eth_requestAccounts' }
        // );
        const accounts = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => (window as any).ethereum.request({
            method: 'eth_requestAccounts'
        }))
        dispatch(setAccount(ethers.getAddress(accounts[0])));
        dispatch(setWeb3(new Web3((window as any).ethereum)));
        dispatch(setSmartContract(new (new Web3((window as any).ethereum)).eth.Contract(Temp_ContractABI, Temp_ContractAddr)))
        console.log(ethers.getAddress(accounts[0]));
        console.log(new Web3((window as any).ethereum))
    } catch (error) {
        console.error('User rejected the request.');
    }
  } else {
    console.error('MetaMask is not installed.');
  }
};

export const disconnectWallet = async (dispatch: AppDispatch) => {
    dispatch(clearAccount());
};