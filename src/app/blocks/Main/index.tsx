import Link from 'next/link';
import {useRef, useState} from "react";
import ScrollButtons from "@/components/ScrollButtons";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {toast} from "sonner";
import Header from "@/components/topMenuTest";

export interface MainProps {
    isHideSideMenu?:boolean;
    handleSideMenu?: ()=>void;
}

export default function Main({
    isHideSideMenu,
    handleSideMenu
}:MainProps) {
    const router = useRouter();

    const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const account = useSelector((state: RootState) => state.wallet.account);

    const [images, setImages] = useState([
        {src: "/main01.png", alt: "Image 1"},
        {src: "/main02.png", alt: "Image 2"},
        {src: "/main03.png", alt: "Image 3"},
        {src: "/main04.png", alt: "Image 4"},
        {src: "/main01.png", alt: "Image 1"},
        {src: "/main02.png", alt: "Image 2"},
        {src: "/main03.png", alt: "Image 3"},
        {src: "/main04.png", alt: "Image 4"},
        {src: "/main01.png", alt: "Image 1"},
        {src: "/main02.png", alt: "Image 2"},
        {src: "/main03.png", alt: "Image 3"},
        {src: "/main04.png", alt: "Image 4"},
    ]);
    const [prompts, setPrompts] = useState([
        {type: "NEWS", content: "Neumann bids $500m for WeWork"},
        {type: "RESEARCH", content: "Explain quantum computing in simple terms."},
        {type: "CODING", content: "How do I make an HTTP request in Javascript?"},
        {type: "BRAINSTORM", content: "Write up 10 recipe ideas using mediterranean ingredients with strong acidity."},
        {type: "NEWS", content: "Timo Werner is staying at Tottenham Hotspur for one more season Fabrizio Romano"},
        {type: "NEWS", content: "Neumann bids $500m for WeWork"},
        {type: "RESEARCH", content: "Explain quantum computing in simple terms."},
        {type: "CODING", content: "How do I make an HTTP request in Javascript?"},
        {type: "BRAINSTORM", content: "Write up 10 recipe ideas using mediterranean ingredients with strong acidity."},
        {type: "NEWS", content: "Timo Werner is staying at Tottenham Hotspur for one more season Fabrizio Romano"},
    ]);
    const imageContainerRef = useRef(null);
    const promptContainerRef = useRef(null);

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'NEWS':
                return 'bg-orange-500 text-black';
            case 'RESEARCH':
                return 'bg-blue-500 text-black';
            case 'CODING':
                return 'bg-white text-black';
            case 'BRAINSTORM':
                return 'bg-purple-300 text-black';
            default:
                return 'bg-gray-800 text-black';
        }
    };


    return (
        <div className="flex flex-col justify-between w-full h-full w-full ">
            <Header 
                inputActive={''} 
                handleSideMenu={handleSideMenu?handleSideMenu:()=>null} 
                isHideSideMenu={isHideSideMenu?isHideSideMenu:false}
            />
            <div className="bg-gray-900 text-white p-4">
            <div className="grid grid-cols-2 gap-4 my-4">
                <div
                    className="bg-orange-500 p-8 text-center text-2xl h-52 flex items-center justify-center rounded-[4px]"
                    style={{backgroundImage: 'url(/orange_bg.svg)', backgroundSize: 'cover'}}
                    onClick={()=>{
                        if(isConnected && account) {
                            router.push('/txt2img')
                        }else {
                            toast.warning('please login');
                        }
                    }}
                >
                    Imagine something
                </div>
                <div
                    className="bg-blue-500 p-8 text-center text-2xl h-52 flex items-center justify-center rounded-[4px]"
                    style={{backgroundImage: 'url(/blue_bg.svg)', backgroundSize: 'cover'}}
                    onClick={()=>{
                        if(isConnected && account) {
                            router.push("/chat/chat_" + account + "_" + Date.now())
                        }else {
                            toast.warning('please login');
                        }
                    }}
                >
                    Talk to AB3L
                </div>
            </div>
            <div className="my-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">Explore Images</h2>
                    <ScrollButtons imageContainerRef={imageContainerRef}/>
                </div>
                <div className="flex space-x-4 overflow-x-scroll" ref={imageContainerRef}
                >
                    {images.map((data, index) => (
                        <img
                            key={index}
                            src={data.src}
                            alt={data.alt}
                            className="w-64 h-64 rounded-[4px]"
                            onClick={() => {
                                toast.info(JSON.stringify(data));
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="my-8">

                <div className="flex justify-between items-center mb-4 ">
                    <h2 className="text-xl">Prompt Inspiration</h2>
                    <ScrollButtons imageContainerRef={promptContainerRef}></ScrollButtons>
                </div>
                <div className="flex space-x-4 overflow-x-scroll" ref={promptContainerRef}
                >
                    {prompts.map((data, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-[11px] rounded-[4px] min-w-[250px] min-h-[188px] max-w-[250px] max-h-[188px] flex flex-col justify-between"
                        >
                            <div>
                                <span className={`pl-3 pr-3 text-xs rounded-full ${getTypeStyles(data.type)}`}>{data.type}</span>
                                <p className="mt-2">“{data.content}”</p>
                            </div>
                            <div onClick={()=>{
                                toast.info(JSON.stringify(data));
                            }}>
                                <a className="text-gray-400 text-sm hover:text-gray-200">Start conversation &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
        
    );
}