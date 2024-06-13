import React from "react";
import ChatTopbar from "./chat-topbar";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";
import { Message, useChat } from "ai/react";
import { ChatRequestOptions } from "ai";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/topMenuTest";

export interface ChatProps {
  chatId?: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  input: string;
  isHideSideMenu?:boolean;
  handleSideMenu?: ()=>void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  loadingSubmit?: boolean;
  error: undefined | Error;
  stop: () => void;
  formRef: React.RefObject<HTMLFormElement>;
  isMobile?: boolean;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Chat({
  messages,
  input,
  isHideSideMenu,
  handleSideMenu,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  setSelectedModel,
  chatId,
  loadingSubmit,
  formRef,
  isMobile,
  setInput,
}: ChatProps) {
  return (
    <div className="flex flex-col justify-between w-full h-full w-full ">
      {/* <ChatTopbar
        setSelectedModel={setSelectedModel}
        isLoading={isLoading}
        chatId={chatId}
        messages={messages}
      /> */}
      <Header 
        inputActive={'chat'} 
        handleSideMenu={handleSideMenu?handleSideMenu:()=>null} 
        isHideSideMenu={isHideSideMenu?isHideSideMenu:false}
      />

      <ChatList
        setSelectedModel={setSelectedModel}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        loadingSubmit={loadingSubmit}
        error={error}
        stop={stop}
        formRef={formRef}
        isMobile={isMobile}
      />

      <ChatBottombar
        setSelectedModel={setSelectedModel}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
        formRef={formRef}
        setInput={setInput}
      />
    </div>
  );
}
