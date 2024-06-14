"use client";

import "./style.css";
import React, {useState, CSSProperties, ImgHTMLAttributes, useEffect} from 'react';

import TopMenu from "@/components/topMenu";
import Header from "@/components/topMenuTest";
import Loading from '@/components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import axios from 'axios';
import BigNumber from "bignumber.js";

const TextareaComponent: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
    <div className="component-container">
        <div className="title-section">{label}</div>
        <div style={{width: '100%'}}>
            <textarea style={{width: '100%'}} rows={3} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    </div>
);

const RangeAndNumberInputComponent: React.FC<{ label: string, value: number, minValue: number, stepValue: number, maxValue:number, setValue: (value: number) => void }> = ({ label, value, setValue, minValue, maxValue, stepValue }) => (
    <div className="num-input-container">
        <div style={{width: '200px'}}><label>{label}</label></div>
        <div>
            <input type="range" min={minValue} max={maxValue} step={stepValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
        <div>
            <input type="number" min={minValue} max={maxValue} step={stepValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
    </div>
);

const RadioComponent: React.FC<{ title: string, label0:string, label1:string, selectedOption:string, handleOptionChange: (value: any) => void }> = (
    { title, label0, label1, selectedOption, handleOptionChange }
) => (
    <div className="num-input-container">
        <div style={{width: '200px'}}>{title}</div>
        <label>
            <input
                type="radio"
                name="option"
                value="AWS"
                checked={selectedOption === label0}
                onChange={handleOptionChange}
            />
            {label0}
        </label>

        <label>
            <input
                type="radio"
                name="option"
                value="IPFS"
                checked={selectedOption === label1}
                onChange={handleOptionChange}
            />
            {label1}
        </label>
    </div>

);
const SubmitButtonComponent: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => (
    <button 
        style={{border: '1px solid white', padding: '5px 50px', borderRadius: '10px'}} 
        onClick={onSubmit}
    >
        Submit
    </button>
);

const ImageCarouselComponent: React.FC<{ images: string[] }> = ({ images }) => (
    <div className="image-list">
        {images.map((src, index) => (
        <img key={index} src={src} alt={`image-${index}`} />
        ))}
    </div>
);


interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    onLoadCallback: () => void;
  }
  
const CustomImage: React.FC<CustomImageProps> = ({ src, alt, onLoadCallback, ...props }) => {
    return (
        <img
        src={src}
        alt={alt}
        onLoad={onLoadCallback}
        {...props}
        />
    );
};
  

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default function Page() {
    const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
    
    const [posiPrompt, setPosiPrompt] = useState('');
    const [negaPrompt, setNegaPrompt] = useState('');
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [interfereStep, setInterfereStep] = useState();
    const [numGenImg, setNumGenImg] = useState();

    const [images, setImages] = useState([]);
    const [txRes, setTxRes] = useState(0); // 0: none, 1: success, 20: Tx Pending, 21: API Loading,  -1: Tx Fail, -2: API Server  Fail, -3  SmartContract  Fail
    
    const account = useSelector((state: RootState) => state.wallet.account);
    const web3Instance = useSelector((state: RootState) => state.wallet.web3Instance);
    const smartContract = useSelector((state: RootState) => state.wallet.SmartContract_A);
    
    const [loadedImages, setLoadedImages] = useState<number>(0);
    const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState('IPFS');
    const handleOptionChange = (event:any) => {
        console.log('TXT2IMG_OPTION', event.target.value)
        localStorage.setItem('TXT2IMG_OPTION', event.target.value);
        setSelectedOption(event.target.value);
    };

    useEffect(()=> {
        const savedPosiPrompt = localStorage.getItem('TXT2IMG_POSI_PROMPT');
        if(savedPosiPrompt){
            setPosiPrompt(savedPosiPrompt);
        }

        const savedNegaPrompt = localStorage.getItem('TXT2IMG_NEGA_PROMPT');
        if(savedNegaPrompt){
            setNegaPrompt(savedNegaPrompt);
        }

        const savedWidth = localStorage.getItem('TXT2IMG_WIDTH');
        console.log("WIDTH S: ", width)
        if(savedWidth){
            // @ts-ignore
            setWidth(parseInt(savedWidth));
        }

        const savedHeight = localStorage.getItem('TXT2IMG_HEIGHT');
        console.log("HEIGHT S: ", width)
        if(savedHeight){
            // @ts-ignore
            setHeight(parseInt(savedHeight));
        }

        const savedInterfereStep = localStorage.getItem('TXT2IMG_InterfereStep');
        if(savedInterfereStep){
            // @ts-ignore
            setInterfereStep(parseInt(savedInterfereStep));
        }

        const savedNumGenImg = localStorage.getItem('TXT2IMG_NumGenImg');
        if(savedNumGenImg){
            // @ts-ignore
            setNumGenImg(parseInt(savedNumGenImg));
        }
        // setLoadedImages(0);
        // setAllImagesLoaded(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('TXT2IMG_POSI_PROMPT', posiPrompt);
    }, [posiPrompt]);

    useEffect(() => {
        localStorage.setItem('TXT2IMG_NEGA_PROMPT', negaPrompt);
    }, [negaPrompt]);

    useEffect(() => {
        console.log("WIDTH E: ", width)
        if(width){
            // @ts-ignore
            localStorage.setItem('TXT2IMG_WIDTH', width.toString());
        }
    }, [width]);

    useEffect(() => {
        console.log("HEIGHT E: ", height)
        if(height){
            // @ts-ignore
            localStorage.setItem('TXT2IMG_HEIGHT', height.toString());
        }
    }, [height]);

    useEffect(() => {
        if(interfereStep){
            // @ts-ignore
            localStorage.setItem('TXT2IMG_InterfereStep', interfereStep.toString());
        }
    }, [interfereStep]);

    useEffect(() => {
        if(numGenImg){
            // @ts-ignore
            localStorage.setItem('TXT2IMG_NumGenImg', numGenImg.toString());
        }
    }, [numGenImg]);

    useEffect(() => {
        console.log("setAllImagesLoaded: ", loadedImages, images.length)
        if (loadedImages === images.length) {
            setAllImagesLoaded(true);
        }
    }, [loadedImages]);

    const handleImageLoad = () => {
        setLoadedImages(prev => prev + 1);
    };
    // const images = [
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     'https://via.placeholder.com/150',
    //     // Add more image URLs as needed
    // ];

    const handleSubmit = () => {
        // alert(`Text1: ${text1}\nText2: ${text2}\nRange1: ${range1}\nRange2: ${range2}\nRange3: ${range3}`);
        const input = { 
            "role": "user",
            "prompt": posiPrompt,
            "negative_prompt": negaPrompt,
            "width": width,
            "height": height,
            "sampling_step":interfereStep,
            "batch_size":numGenImg,
            "imgServer": selectedOption
        }

        console.log("Input: ", input)
        setTxRes(20);
        setLoadedImages(0);
        setAllImagesLoaded(false);
        // @ts-ignore
        web3Instance.eth.getTransactionCount(account, 'latest').then(async (nonce) => {
            // @ts-ignore
            const gasEstimate = await smartContract.methods.A(JSON.stringify(input)).estimateGas({
                from: account,
                value: BigNumber(10**15).toString()
            });

            // @ts-ignore
            smartContract.methods.A(JSON.stringify(input)).send({
            from: account,
            value: BigNumber(10**15).toString(),
            gas: new BigNumber(gasEstimate).multipliedBy(1.1).toFixed(0).toString(), //gas 량
            nonce: nonce//재접속한 횟수
            }).then((results:any) => {
            if(results['status']){
                alert("Tx Confirmed, Estimated time: Up to 5 minutes");
                // handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                const jsonData = {
                    "model": "llama3",
                    "messages": [
                        input
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
                            setImages(response.data.img_file);
                            setTxRes(22);
                            await delay(10000); 
                            setTxRes(1);
                        }
                        else{
                            console.log("\t\t postGenImg) Faile: ", response.data)
                            setTxRes(-2);
                        }
                    });
                }
                catch(e){
                    console.log("API Error: ", e)
                    setTxRes(-1);
                }
            }
            else{
                alert("Tx Failed")
            }
            });
        })


    };

    return (
        <main className="flex h-[calc(100dvh)] flex-col items-center">
            <Header inputActive={'txt2img'} />
            
            {isConnected && (
                // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="app-container">
                    {/* <h1 style={{fontSize: '34px', fontWeight: 'bold'}}> Generate Text to Images</h1> */}
                    <TextareaComponent label="Positive Prompt" value={posiPrompt} setValue={setPosiPrompt} />
                    <TextareaComponent label="Negative Prompt" value={negaPrompt} setValue={setNegaPrompt} />
                    <RangeAndNumberInputComponent label="Width" value={width?width: 8} minValue={8} maxValue={512} stepValue={8} setValue={setWidth} />
                    <RangeAndNumberInputComponent label="Height" value={height?height:8} minValue={8} maxValue={512} stepValue={8} setValue={setHeight} />
                    <RangeAndNumberInputComponent label="Sampling Step" minValue={1} maxValue={500} stepValue={1} value={interfereStep?interfereStep:1} setValue={setInterfereStep} />
                    <RangeAndNumberInputComponent label="Num of Imgs" minValue={1} maxValue={10} stepValue={1} value={numGenImg?numGenImg:1} setValue={setNumGenImg} />
                    <RadioComponent title = "Img Server" label0="AWS" label1="IPFS" selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
                    {/* <div>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="AWS"
                            checked={selectedOption === 'AWS'}
                            onChange={handleOptionChange}
                        />
                        AWS
                        </label>
                        <br />
                        <label>
                        <input
                            type="radio"
                            name="option"
                            value="IPFS"
                            checked={selectedOption === 'IPFS'}
                            onChange={handleOptionChange}
                        />
                        IPFS
                        </label>
                    </div> */}
                    {(txRes === 1 || txRes === 0) && allImagesLoaded && (
                        <SubmitButtonComponent onSubmit={handleSubmit} />
                    )}
                    {/* {(txRes === 1) && (
                        <ImageCarouselComponent images={images} />
                        
                        
                    )} */}
                    {(txRes === 20) && (
                        <Loading inputText={'Tx Pending'}/>
                    )}
                    {(txRes === 21) && (
                        <Loading inputText={'Tx Success & API Loading'}/>
                    )}
                    {(txRes === 22 || txRes === 1) && !allImagesLoaded && (
                        <Loading inputText={`${loadedImages} / ${images.length} Done and Waiting`}/>
                    )}
                    {(txRes === -1 || txRes === -2) && (
                        <div>API Failed</div>
                    )}
                    {(txRes === -3) && (
                        <div>Smart Contract Failed</div>
                    )}
                    <div className="image-list">
                    {!allImagesLoaded ? (
                        <div></div>
                    ) : (
                        images.map((src, index) => (
                        <CustomImage
                            key={index}
                            src={src}
                            alt={`Example Image ${index + 1}`}
                            onLoadCallback={handleImageLoad}
                            style={{ display: 'block' }}
                        />
                        ))
                    )}
                    {images.map((src, index) => (
                    <CustomImage
                        key={index}
                        src={src}
                        alt={`Example Image ${index + 1}`}
                        onLoadCallback={handleImageLoad}
                        style={{ display: 'none' }}
                    />
                    ))}
                </div>
                    
                </div>
            )}
        </main>
    ); 
}


