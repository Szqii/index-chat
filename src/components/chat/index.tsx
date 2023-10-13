"use client";
import {CSSProperties, useState} from "react";
import {ChatPopup} from "@/components/chat/chat-popup";

export const IndexChat = (props: {
    style?: CSSProperties,
}) => {
    const [isChatPopupOpen, setIsChatPopupOpen] = useState(false)

    const hideChatPopup = () => {
        setIsChatPopupOpen(false)
    }

    return (
        <>
            <button
                style={{...props.style}}
                onClick={() => setIsChatPopupOpen(!isChatPopupOpen)}
                className="bg-text shadow-lg hover:scale-110 font-bold p-4 rounded-full absolute bottom-12 right-12 transition">
                <img src={'/start-chat.svg'} alt='start-chat-icon' className="h-5 w-5"/>
            </button>

            {isChatPopupOpen && <ChatPopup hideChatPopup={hideChatPopup}/>}
        </>
    )
}
