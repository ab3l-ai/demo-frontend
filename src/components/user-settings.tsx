"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GearIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { set } from "zod";
import UsernameForm from "./username-form";
import EditUsernameForm from "./edit-username-form";
import PullModel from "./pull-model";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { connectWallet, disconnectWallet } from '@/utils/wallet';


export default function UserSettings() {
  const isConnected = useSelector((state: RootState) => state.wallet.isConnected);
  const account = useSelector((state: RootState) => state.wallet.account);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const username = localStorage.getItem("ai_llm_user");
  //     if (username) {
  //       setName(username);
  //       setIsLoading(false);
  //     }
  //   };

  //   const fetchData = () => {
  //     const username = localStorage.getItem("ai_llm_user");
  //     if (username) {
  //       setName(username);
  //       setIsLoading(false);
  //     }
  //   };

  //   // Initial fetch
  //   fetchData();

  //   // Listen for storage changes
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);
  const handleWallet = async () => {
    if(isConnected){
      disconnectWallet(dispatch);
      connectWallet(dispatch);
    }
    else{
      connectWallet(dispatch);
    }
  }

  useEffect( () => {
    if(account){
      setName(account?account:"CONNECT WALLET");
      setIsLoading(false);
    }
  }, [account]);
  return (
        <Button
          variant="ghost"
          className="flex justify-start gap-3 w-full h-14 text-base font-normal items-center "
          onClick={handleWallet}
        >
          <Avatar className="flex justify-start items-center overflow-hidden">
            <AvatarImage
              src=""
              alt="AI"
              width={4}
              height={4}
              className="object-contain"
            />
            <AvatarFallback>
              {name && name.substring(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-xs truncate">
            {isLoading ? (
              <Skeleton className="w-20 h-4" />
            ) : (
              name || "Anonymous"
            )}
          </div>
        </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger>
    //     <Button
    //       variant="ghost"
    //       className="flex justify-start gap-3 w-full h-14 text-base font-normal items-center "
    //     >
    //       <Avatar className="flex justify-start items-center overflow-hidden">
    //         <AvatarImage
    //           src=""
    //           alt="AI"
    //           width={4}
    //           height={4}
    //           className="object-contain"
    //         />
    //         <AvatarFallback>
    //           {name && name.substring(2, 4).toUpperCase()}
    //         </AvatarFallback>
    //       </Avatar>
    //       <div className="text-xs truncate">
    //         {isLoading ? (
    //           <Skeleton className="w-20 h-4" />
    //         ) : (
    //           name || "Anonymous"
    //         )}
    //       </div>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-48 p-2">
    //     <DropdownMenuItem onSelect={(e) => {alert("HIT"); e.preventDefault()}}>
    //           {/* <PullModel /> */}
    //     </DropdownMenuItem>
    //     <Dialog>
    //       <DialogTrigger className="w-full">
    //         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //           <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
    //             <GearIcon className="w-4 h-4" />
    //             Settings
    //           </div>
    //         </DropdownMenuItem>
    //       </DialogTrigger>
    //       <DialogContent>
    //         <DialogHeader className="space-y-4">
    //           <DialogTitle>Settings</DialogTitle>
    //           <EditUsernameForm setOpen={setOpen} />
    //         </DialogHeader>
    //       </DialogContent>
    //     </Dialog>
    //     <Dialog>
    //     </Dialog>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
