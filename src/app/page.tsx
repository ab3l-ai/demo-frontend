"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import Link from 'next/link'
import TopMenu from '@/components/topMenu';
import { time } from "console";
import Main from "@/blocks/Main";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function Home() {
    const formRef = useRef<HTMLFormElement>(null);

    return (

            <main className="flex h-[calc(100dvh)] flex-col items-center">
              <ChatLayout
                  chatId={""}
                  setSelectedModel={()=>null}
                  messages={[]}
                  input={''}
                  handleInputChange={()=>null}
                  handleSubmit={()=>null}
                  isLoading={false}
                  loadingSubmit={false}
                  error={undefined}
                  stop={()=>null}
                  navCollapsedSize={10}
                  defaultLayout={[30, 160]}
                  setMessages={()=>null}
                  setInput={()=>null}
                  formRef={formRef}

              />
          </main>

    );
}
