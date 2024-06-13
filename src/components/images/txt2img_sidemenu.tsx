"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styled from 'styled-components';

import { 
    TextareaComponent, RangeAndNumberInputComponent, RadioComponent, CustomImage
} from '@/components/images/txt2img_component';

interface HeaderProps {
    inputActive: string;
    isHideSideMenu:boolean;
    handleSideMenu: ()=>void;
}

const Txt2ImgSidemenu = () => {
    
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [interfereStep, setInterfereStep] = useState();
    const [numGenImg, setNumGenImg] = useState();

    const [selectedOption, setSelectedOption] = useState('IPFS');
    const handleOptionChange = (event:any) => {
        console.log('TXT2IMG_OPTION', event.target.value)
        // @ts-ignore
        localStorage.setItem('TXT2IMG_OPTION', event.target.value);
        setSelectedOption(event.target.value);
    };

    useEffect(()=> {

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

    return (
        <div className="app-contain-div">
            <RangeAndNumberInputComponent label="Width" value={width?width: 8} minValue={8} maxValue={512} stepValue={8} setValue={setWidth} />
            <RangeAndNumberInputComponent label="Height" value={height?height:8} minValue={8} maxValue={512} stepValue={8} setValue={setHeight} />
            <RangeAndNumberInputComponent label="Sampling Step" minValue={1} maxValue={500} stepValue={1} value={interfereStep?interfereStep:1} setValue={setInterfereStep} />
            <RangeAndNumberInputComponent label="Num of Imgs" minValue={1} maxValue={10} stepValue={1} value={numGenImg?numGenImg:1} setValue={setNumGenImg} />
            <RadioComponent title = "Img Server" label0="AWS" label1="IPFS" selectedOption={selectedOption} handleOptionChange={handleOptionChange} /> 
        </div>
    );
};


export default Txt2ImgSidemenu;