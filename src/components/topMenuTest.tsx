"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styled from 'styled-components';

import ConnectWallet from '../components/ConnectWallet';

interface HeaderProps {
    inputActive: string;
    isHideSideMenu:boolean;
    handleSideMenu: ()=>void;
}

const Header: React.FC<HeaderProps> = ({ inputActive, isHideSideMenu, handleSideMenu }) => {
    const [activeTab, setActiveTab] = useState<string>(inputActive);
    const router = useRouter();

    const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const account = useSelector((state: RootState) => state.wallet.account);

    useEffect(() => {
        setActiveTab(inputActive);
        console.log(isConnected, activeTab)
    }, [isConnected])

    const handleLogoClick = () => {
        // router.push('/');
        handleSideMenu();
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if(tab === 'chat'){
            router.push('/chat/chat_'+account+'_'+Date.now());
        }
        else if(tab === 'txt2img'){
            router.push('/img_gen');
        }
    };

    return (
        <Container>
            { isHideSideMenu ?
            <Logo>
                <div onClick={handleLogoClick}>
                    <img src="/logo.png" alt="Logo" style={styles.logoImage}/>
                </div>
            </Logo>
            :
            <div style={{height: '18px'}}></div>
            }
            
            <div>
            Model Plugins: AB3L
            </div>

            <div>
            Enabled Plugins:  Contract-AB3L
            </div>
            {/* {!isConnected ? (
                <Tabs>
                    <Tab isActive={activeTab === 'chat'} onClick={() => handleTabClick('chat')} disabled={true}>
                        Chat
                    </Tab>
                    <Tab isActive={activeTab === 'txt2img'} onClick={() => handleTabClick('txt2img')} disabled={true}>
                        Generate Image
                    </Tab>
                </Tabs>

            )
            : (
                <Tabs>
                    <Tab isActive={activeTab === 'chat'} onClick={() => handleTabClick('chat')} disabled={false}>
                        Chat
                    </Tab>
                    <Tab isActive={activeTab === 'txt2img'} onClick={() => handleTabClick('txt2img')} disabled={false}>
                        Generate Image
                    </Tab>
                </Tabs>

            )} */}
                
            <ConnectWallet />
        </Container>
        // <header style={styles.header}>
        // <div style={styles.logo} onClick={handleLogoClick}>
        //     <img src="/LimAI.png" alt="Logo" style={styles.logoImage} />
        // </div>
        // <div style={styles.tabs}>
        //     <div
        //     style={{
        //         ...styles.tab,
        //         ...(activeTab === 'chat' ? styles.activeTab : {}),
        //     }}
        //     onClick={() => handleTabClick('chat')}
        //     >
        //     Chat
        //     </div>
        //     <div
        //     style={{
        //         ...styles.tab,
        //         ...(activeTab === 'txt2img' ? styles.activeTab : {}),
        //     }}
        //     onClick={() => handleTabClick('txt2img')}
        //     >
        //     Generate Image 
        //     </div>
        // </div>
        // <button style={styles.button}>Connect Wallet</button>
        // </header>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #1C1C1C;
`;

const Logo = styled.div`
  a {
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    color: #000;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Tab = styled.div<{ isActive: boolean; disabled: boolean }>`
  padding: 10px 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ isActive, disabled }) => 
    disabled ? '#6c757d' : isActive ? '#ffffff' : '#007bff'};
  background-color: ${({ isActive, disabled }) => 
    disabled ? '#e9ecef' : isActive ? '#007bff' : 'transparent'};
  border-radius: 4px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ConnectWalletButton = styled.div`
  button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
  }
`;
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#1f3034',
  },
  logo: {
    cursor: 'pointer',
  },
  logoImage: {
    height: '18px',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    margin: '0 15px',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  activeTab: {
    backgroundColor: '#007bff',
    color: '#ffffff',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Header;