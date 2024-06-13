import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { connectWallet, disconnectWallet } from '@/utils/wallet';
import { useRouter } from "next/navigation";

const ConnectWallet: React.FC = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.wallet.account);
  const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
  const router = useRouter();

  function extractParts(input: string | null): string {
    if (input === null) return "null";

    if (input.length <= 8) {
      // If the string is less than or equal to 8 characters, return the whole string
      return input;
    } else {
      const start = input.substring(0, 4);
      const end = input.substring(input.length - 4);
      return `${start}...${end}`;
    }
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <div>Connected: {extractParts(account)}</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #55f1dec4', borderRadius: '5px'}}>
            <button style={{padding: '2px 20px'}} onClick={() => {
              disconnectWallet(dispatch)
              router.push("/");
            }}>
              Disconnect
            </button>
          </div>
          
        </div>
      
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #55f1dec4', borderRadius: '5px'}}>
          <button style={{padding: '5px 20px'}} onClick={() => {
            connectWallet(dispatch)
          }}>
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;