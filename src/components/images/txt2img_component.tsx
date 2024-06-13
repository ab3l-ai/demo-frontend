"use client";

import "./txt2img_compoenet.css";
import React, {useState, CSSProperties, ImgHTMLAttributes, useEffect} from 'react';

import TopMenu from "@/components/topMenu";
import Header from "@/components/topMenuTest";
import Loading from '@/components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import axios from 'axios';
import BigNumber from "bignumber.js";

export const TextareaComponent: React.FC<{ label: string, value: string, setValue: (value: string) => void }> = ({ label, value, setValue }) => (
    <div className="component-container">
        <div className="title-section">{label}</div>
        <div style={{width: '100%'}}>
            <textarea style={{width: '100%'}} rows={3} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    </div>
);

export const RangeAndNumberInputComponent: React.FC<{ label: string, value: number, minValue: number, stepValue: number, maxValue:number, setValue: (value: number) => void }> = ({ label, value, setValue, minValue, maxValue, stepValue }) => (
    <div style={{width: '100%'}}>
        <div><label>{label}</label></div>
        <div className="num-input-container">
            {/* <div>
                <input type="range" min={minValue} max={maxValue} step={stepValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
            </div> */}
            <div >
                <input style={{width: '100%'}} type="number" min={minValue} max={maxValue} step={stepValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
            </div>
        </div>
    </div>
        
);

export const RadioComponent: React.FC<{ title: string, label0:string, label1:string, selectedOption:string, handleOptionChange: (value: any) => void }> = (
    { title, label0, label1, selectedOption, handleOptionChange }
) => (
    <div style={{width: '100%'}}>
        <div>{title}</div>
        <div className="num-input-container">
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
    </div>
);
export const SubmitButtonComponent: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => (
    <button 
        style={{border: '1px solid white', padding: '5px 50px', borderRadius: '10px'}} 
        onClick={onSubmit}
    >
        Submit
    </button>
);

export const ImageCarouselComponent: React.FC<{ images: string[] }> = ({ images }) => (
    <div className="image-list">
        {images.map((src, index) => (
        <img key={index} src={src} alt={`image-${index}`} />
        ))}
    </div>
);


export interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    onLoadCallback: () => void;
  }
  
export const CustomImage: React.FC<CustomImageProps> = ({ src, alt, onLoadCallback, ...props }) => {
    return (
        <img
        src={src}
        alt={alt}
        onLoad={onLoadCallback}
        {...props}
        />
    );
};