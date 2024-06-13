"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import { getSelectedModel } from "@/lib/model-helper";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { ChatRequestOptions } from "ai";
import { Message, useChat } from "ai/react";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import TopMenu from "@/components/topMenu";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { connectWallet, disconnectWallet } from '@/utils/wallet';
import { Temp_ContractABI, Temp_ContractAddr} from '@/contracts/temp_contract';
import BigNumber from "bignumber.js";

import Header from "@/components/topMenuTest";

export default function Page() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
        stop,
        setMessages,
        setInput,
    } = useChat({
        onResponse: (response) => {
        if (response) {
            setLoadingSubmit(false);
        }
        },
        onError: (error) => {
        setLoadingSubmit(false);
        toast.error("An error occurred. Please try again.");
        },
    });
    
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const isConnected = useSelector((state: RootState) => state.wallet.isConnected);

    const account = useSelector((state: RootState) => state.wallet.account);
    const web3Instance = useSelector((state: RootState) => state.wallet.web3Instance);
    const smartContract = useSelector((state: RootState) => state.wallet.SmartContract_A);
    
    const dispatch = useDispatch();
    const router = useRouter();


    React.useEffect(() => {
        if(!isConnected){
            toast.warning("Unusual to access page. Connect Wallet")
            disconnectWallet(dispatch)
            router.push("/");
        }

    }, []);

    // React.useEffect(() => {
    //     console.log("Input: ", input)

    // }, [input]);


    return (
        <main className="flex h-[calc(100dvh)] flex-col items-center">
            {isConnected && (
            <ChatLayout
                chatId={"txt2img_page"}
                setSelectedModel={()=>null}
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={()=>null}
                isLoading={isLoading}
                loadingSubmit={loadingSubmit}
                error={error}
                stop={stop}
                navCollapsedSize={10}
                defaultLayout={[30, 160]}
                setMessages={setMessages}
                setInput={setInput}
                formRef={formRef}

            />
            )}     
        </main>
    );
}
