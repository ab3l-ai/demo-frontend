import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';

interface WalletState {
  account: string | null;
  isConnected: boolean;
  web3Instance: Web3 | null;
  SmartContract_A: any;
}

const initialState: WalletState = {
  account: null,
  isConnected: false,
  web3Instance: null,
  SmartContract_A: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<string | null>) {
      state.account = action.payload;
      state.isConnected = !!action.payload;
    },
    setWeb3(state, action: PayloadAction<Web3 | null>) {
      state.web3Instance = action.payload;
    },
    setSmartContract(state, action: PayloadAction<any>) {
      state.SmartContract_A = action.payload;
    },
    clearAccount(state){
      state.account = null;
      state.isConnected = false;
      state.web3Instance = null;
      state.SmartContract_A = null;
    }
  },
});

export const { setAccount, setWeb3, clearAccount, setSmartContract } = walletSlice.actions;
export default walletSlice.reducer;