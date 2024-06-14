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

export default function Page({ params }: { params: { id: string } }) {
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
  const [chatId, setChatId] = React.useState<string>("");
  const [selectedModel, setSelectedModel] = React.useState<string>(
    getSelectedModel()
  );
  const [ollama, setOllama] = React.useState<ChatOllama>();
  const env = process.env.NODE_ENV;
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isConnected = useSelector((state: RootState) => state.wallet.isConnected);

  const account = useSelector((state: RootState) => state.wallet.account);
  const web3Instance = useSelector((state: RootState) => state.wallet.web3Instance);
  const smartContract = useSelector((state: RootState) => state.wallet.SmartContract_A);
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (env === "production") {
      const newOllama = new ChatOllama({
        baseUrl: process.env.NEXT_PUBLIC_LLM_URL || "http://localhost:11434",
        model: selectedModel,
      });
      setOllama(newOllama);
    }
  }, [selectedModel]);

  React.useEffect(() => {
    if (params.id) {
      if(params.id.split('_')[1] === account){
        const item = localStorage.getItem(`${params.id}`);
        if (item) {
          setMessages(JSON.parse(item));
        }
      }
      else{
        toast.warning("Unusual to access page. Connect Wallet!")
        disconnectWallet(dispatch)
        router.push("/");
      }
    }
    // @ts-ignore
    // setSmartContract(new web3Instance.eth.Contract(Temp_ContractABI, Temp_ContractAddr));

  }, []);

  const addMessage = (Message: any) => {
    messages.push(Message);
    window.dispatchEvent(new Event("storage"));
    setMessages([...messages]);
  };

  // Function to handle chatting with Ollama in production (client side)
  const handleSubmitProduction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    addMessage({ role: "user", content: input, id: chatId });
    setInput("");

    if (ollama) {
      try {
        const parser = new BytesOutputParser();

        const stream = await ollama
          .pipe(parser)
          .stream(
            (messages as Message[]).map((m) =>
              m.role == "user"
                ? new HumanMessage(m.content)
                : new AIMessage(m.content)
            )
          );

        const decoder = new TextDecoder();

        let responseMessage = "";
        for await (const chunk of stream) {
          const decodedChunk = decoder.decode(chunk);
          responseMessage += decodedChunk;
          setLoadingSubmit(false);
          setMessages([
            ...messages,
            { role: "assistant", content: responseMessage, id: chatId },
          ]);
        }
        addMessage({ role: "assistant", content: responseMessage, id: chatId });
        setMessages([...messages]);

        localStorage.setItem(`${params.id}`, JSON.stringify(messages));
        // Trigger the storage event to update the sidebar component
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        setLoadingSubmit(false);
      }
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);

    setMessages([...messages]);

    // Prepare the options object with additional body data, to pass the model.
    const requestOptions: ChatRequestOptions = {
      options: {
        body: {
          selectedModel: selectedModel,
        },
      },
    };

    // if (env === "production" && selectedModel !== "REST API") {
    //   console.log("Product: ", e)
    //   handleSubmitProduction(e);
    // } else {
    if(true){
      console.log("Else : ", e)

      // @ts-ignore
      web3Instance.eth.getTransactionCount(account, 'latest').then(async (nonce) => {
        // @ts-ignore
        const gasEstimate = await smartContract.methods.A(input).estimateGas({
          from: account,
          value: BigNumber(10**15).toString()
        });

        // @ts-ignore
        smartContract.methods.A(input).send({
          from: account,
          value: BigNumber(10**15).toString(),
          gas: new BigNumber(gasEstimate).multipliedBy(1.1).toFixed(0).toString(), //gas 량
          nonce: nonce//재접속한 횟수
        }).then((results:any) => {
          if(results['status']){
            alert("Tx Confirmed, Estimated time: Up to 5 minutes");
            // handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            handleSubmitProduction(e);
          }
          else{
            alert("Tx Failed")
          }
        });
      })

      
      // // @ts-ignore
      // console.log("Enter!!!", account, nonce, gasEstimate, e.target.value)

      // // @ts-ignore
      // smartContract.methods.addMessage(e.target.value).send({
      //   from: account,
      //   value: BigNumber(10*16).toString(),
      //   gas: new BigNumber(gasEstimate).multipliedBy(1.1).toFixed(0).toString(), //gas 량
      //   nonce: nonce//재접속한 횟수
      // }).then((results:any) => {
      //   if(results['status']){
      //     alert("Tx Confirmed, Estimated time: Up to 5 minutes");
      //     handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      //   }
      //   else{
      //     alert("Tx Failed")
      //   }
      // });

      // use the /api/chat route
      // Call the handleSubmit function with the options
      // handleSubmit(e, requestOptions);
    }
  };

  // When starting a new chat, append the messages to the local storage
  React.useEffect(() => {
    if (!isLoading && !error && messages.length > 0) {
      localStorage.setItem(`${params.id}`, JSON.stringify(messages));
      // Trigger the storage event to update the sidebar component
      window.dispatchEvent(new Event("storage"));
    }
  }, [messages, chatId, isLoading, error]);

  return (
      <main className="flex h-[calc(100dvh)] flex-col items-center">
        {/* <TopMenu /> */}
 

        {isConnected && (
          <ChatLayout
            chatId={params.id}
            setSelectedModel={setSelectedModel}
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={onSubmit}
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
