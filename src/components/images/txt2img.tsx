import React, {useEffect, useState, useRef} from "react";

import { Message, useChat } from "ai/react";
import { ChatRequestOptions } from "ai";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/topMenuTest";
import Txt2imgBottombar from "@/components/images/txt2img_bottombar";
import Modal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import axios from 'axios';
import BigNumber from "bignumber.js";
import { toast } from "sonner";
import Loading from '@/components/Loading';

export interface TxT2ImgProps {
    input: string;
    isHideSideMenu?:boolean;
    messages: Message[];
    handleSideMenu?: ()=>void;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
    error: undefined | Error;
    stop: () => void;
    formRef: React.RefObject<HTMLFormElement>;
    setInput?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Txt2Img({
    input,
    messages,
    isHideSideMenu,
    handleSideMenu,
    handleInputChange,
    isLoading,
    error,
    stop,
    formRef,
    setInput,
}:TxT2ImgProps){
    const account = useSelector((state: RootState) => state.wallet.account);
    const web3Instance = useSelector((state: RootState) => state.wallet.web3Instance);
    const smartContract = useSelector((state: RootState) => state.wallet.SmartContract_A);
    

    const [images, setImages] = useState([
        '/testImg/1.jpg',
        '/testImg/2.jpg',
        '/testImg/3.jpg',
        '/testImg/4.jpg',
        '/testImg/5.jpg',
        '/testImg/6.jpg',
        '/testImg/7.jpg',
        '/testImg/8.jpg',
        '/testImg/9.jpg',
        '/testImg/10.jpg',
        '/testImg/11.jpg',
        '/testImg/12.jpg',
        '/testImg/13.jpg',
        '/testImg/14.jpg',
        '/testImg/15.jpg',
        '/testImg/16.jpg',
        '/testImg/17.jpg',
        '/testImg/18.jpg',
        '/testImg/19.jpg',
    ]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputStr, setInputStr] = useState('');
    const [loadedImages, setLoadedImages] = useState<number>(0);
    const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(true);
    const [txRes, setTxRes] = useState(0); // 0: none, 1: success, 20: Tx Pending, 21: API Loading,  -1: Tx Fail, -2: API Server  Fail, -3  SmartContract  Fail

    const formRef2 = useRef<HTMLFormElement>(null);

    const clickImg = (src:any) => {
        alert(src)
        setSelectedImage(src);
    };
    
    useEffect(() => {
        console.log("Input: ", inputStr)
        setInputStr(input)
    }, [input]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log("setAllImagesLoaded: ", loadedImages, images.length)
        if (loadedImages === images.length) {
            setAllImagesLoaded(true);
        }
    }, [loadedImages]);

    const handleInputStrChange = (event:any) => {
        setInputStr(event.target.value);
    };

    const handleImageLoad = () => {
        setLoadedImages(prev => prev + 1);
    };

    const onSubmit = () => {
        const savedWidth = localStorage.getItem('TXT2IMG_WIDTH');
        const savedHeight = localStorage.getItem('TXT2IMG_HEIGHT');
        const savedInterfereStep = localStorage.getItem('TXT2IMG_InterfereStep');
        const savedNumGenImg = localStorage.getItem('TXT2IMG_NumGenImg');
        const savedImgServerOption = localStorage.getItem('TXT2IMG_OPTION');

        const ImgGenInfo = { 
            "role": "user",
            "prompt": inputStr,
            "negative_prompt": '',
            "width": savedWidth,
            "height": savedHeight,
            "sampling_step":savedInterfereStep,
            "batch_size":savedNumGenImg,
            "imgServer": savedImgServerOption
        }

        console.log('This:', ImgGenInfo)
        setAllImagesLoaded(false);
        setLoadedImages(0);
        setTxRes(20);

        // @ts-ignore
        web3Instance.eth.getTransactionCount(account, 'latest').then(async (nonce) => {
            // @ts-ignore
            const gasEstimate = await smartContract.methods.A(JSON.stringify(ImgGenInfo)).estimateGas({
                from: account,
                value: BigNumber(10**15).toString()
            });

            // @ts-ignore
            smartContract.methods.A(JSON.stringify(ImgGenInfo)).send({
            from: account,
            value: BigNumber(10**15).toString(),
            gas: new BigNumber(gasEstimate).multipliedBy(1.1).toFixed(0).toString(), //gas 량
            nonce: nonce//재접속한 횟수
            }).then((results:any) => {
            if(results['status']){
                toast.info("Tx Confirmed, Estimated time: Up to 5 minutes");
                // handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                const jsonData = {
                    "model": "llama3",
                    "messages": [
                        ImgGenInfo
                    ],
                    "stream": false
                }
                setTxRes(21);
                try{
                    axios.post(
                        // "http://0.0.0.0:8000/img/", 
                        "/api_endpoint/txt2img/",
                        jsonData, 
                        {
                            headers: {
                            'Content-Type': 'application/json',
                            },
                        }
                    ).then(async (response) => {
                        if(response.status == 200){
                            console.log("\t\t postGenImg) Success: ", response.data.img_file)
                            setImages(response.data.img_file.concat(images));
                            setTxRes(22);
                            // await delay(10000); 
                            setTxRes(1);
                        }
                        else{
                            console.log("\t\t postGenImg) Faile: ", response.data)
                            // setTxRes(-2);
                        }
                    });
                }
                catch(e){
                    console.log("API Error: ", e)
                    // setTxRes(-1);
                }
            }
            else{
                toast.info("Tx Failed")
            }
            });
        })
    }

    return (
        <div className="flex flex-col justify-between w-full h-full w-full ">

            <Header 
                inputActive={'chat'} 
                handleSideMenu={handleSideMenu?handleSideMenu:()=>null} 
                isHideSideMenu={isHideSideMenu?isHideSideMenu:false}
            />
        
            
            <div className="container">
                
                <div className="masonry-grid">
                    {images.map((src, index) => (
                    <div 
                        key={index} 
                        className="image-container"
                        
                        onClick={() => clickImg(src)}
                    >
                        <img 
                        src={src} 
                        alt={`image-${index}`} 
                        onLoad={handleImageLoad} 
                        // style={allImagesLoaded? {display: 'block'} : {display: 'none'}}
                        style={{display: 'block'}}
                        />
                    </div>
                    ))}
                    
                </div>
                {(txRes === 20) && (
                    <Loading inputText={'Tx Pending'}/>
                )}
                {(txRes === 21) && (
                    <Loading inputText={'Tx Success & API Loading'}/>
                )}
                {(txRes === 22 || txRes === 1) && !allImagesLoaded && (
                    <Loading inputText={`${loadedImages} / ${images.length} Done and Waiting`}/>
                )}
                <style jsx>{`
                    .container {
                    position: relative;
                    padding-bottom: 100px; /* Input field height */
                    overflow-y: auto;
                    }
                    .masonry-grid {
                    column-count: 4;
                    column-gap: 10px;
                    }
                    .image-container {
                    break-inside: avoid;
                    margin-bottom: 10px;
                    transition: transform 0.3s;
                    cursor: pointer;
                    }
                    .image-container:hover {
                    transform: scale(1.05);
                    }
                    img {
                    width: 100%;
                    height: auto;
                    display: block;
                    }
                    .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 1000;
                    }
                `}</style>
            </div>
            
            {allImagesLoaded &&
                <Txt2imgBottombar
                    input={inputStr}
                    handleInputChange={handleInputStrChange}
                    handleSubmit={onSubmit}
                    setInput={setInputStr}
                />
            }

        </div>
      );
}
