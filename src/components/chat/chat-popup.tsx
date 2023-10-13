"use client";
import {Header} from "@/components/chat/header";
import {Content} from "@/components/chat/content";
import {Footer} from "@/components/chat/footer";
import {createRef, useEffect, useState} from "react";

export const ChatPopup = (props: {
    hideChatPopup: () => void
}) => {
    const [isReset, setIsReset] = useState(false)
    const popupContainerRef = createRef<HTMLDivElement>();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },);

    const handleClickOutside = (event: any) => {
        if (popupContainerRef.current && !popupContainerRef.current.contains(event.target)) {
            props.hideChatPopup()
        }
    };
    const _resetIndex = () => {
        setIsReset(true)
    }


    return (
        <div className={'h-screen w-screen bg-black/[.5] absolute flex justify-center items-center'}
             data-testid="index-chat-popup">
            <div
                ref={popupContainerRef}
                className={'flex flex-col h-[560px] max-w-full w-3/4 md:w-[560px] rounded-sm bg-white text-black p-4'}>
                <Header resetIndex={_resetIndex}/>
                <Content isReset={isReset} setIsReset={setIsReset}/>
                <Footer/>
            </div>
        </div>
    )
}
