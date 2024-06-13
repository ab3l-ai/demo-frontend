"use client";

import Link from "next/link";
import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import ConnectWallet from '../components/ConnectWallet';


// export function topMenu({
// }:any) {
  
//   useEffect(() => {
//   }, []);


//   return (
//     <>

//     </>
//   );
// }



export default function TopMenu({
}:any) {
    const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const account = useSelector((state: RootState) => state.wallet.account);
  
    useEffect(() => {
    }, []);


    return (
        <div>
            {isConnected ?
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <ConnectWallet />
                    <div>
                        <Link href={"/chat/chat_"+account+"_"+Date.now()}>
                            Chat  GPT
                        </Link>
                    </div>
                    <div>
                        <Link href="/img_gen">
                            Stable Diffusion
                        </Link>
                    </div>
                </div>
                :
                <ConnectWallet />
            }
        </div>
    );
}
