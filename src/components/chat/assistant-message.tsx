"use client";

import {ClipboardDocumentIcon, ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {TypingDot} from "@/components/chat/typing-dots";
import {ArrowPathIcon} from "@heroicons/react/20/solid";

interface AssistantMessageProps {
    message: string;
    isLast: boolean;
    regenerateResponse?: () => void;
    isTyping?: boolean;
}

export const AssistantMessage = ({message, isLast, isTyping, regenerateResponse}: AssistantMessageProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const _copyToClipboard = async () => {
        await navigator.clipboard.writeText(message)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div data-testid={'assistant-message'}>
            <div className={'w-full flex items-center py-6' + (!isLast ? ' border-b border-gray-200' : '')}>
                <div className={'w-6 h-6 mr-3 border flex items-center justify-center rounded-sm self-start'}>
                    <img
                        className={'rounded-sm'}
                        alt='profile-picture'
                        src={'/chatbot-icon.png'}
                    />
                </div>
                {isTyping
                    ? <TypingDot/> :
                    <>
                        <div className={'w-full break-words self-start'}>
                            {message}
                        </div>
                        {isLast && <div className={'self-baseline ms-2'}>
                            <div className={'cursor-pointer mb-4'} onClick={_copyToClipboard}
                                 data-testid={'copy-message-button'}>
                                {isCopied
                                    ? <div data-testid={'clipboard-check'}>
                                        <ClipboardDocumentCheckIcon className={'w-5 h-5'}/>
                                    </div>
                                    : <ClipboardDocumentIcon className={'w-5 h-5'}/>
                                }
                            </div>

                            <div className={'cursor-pointer'} onClick={regenerateResponse}>
                                {<ArrowPathIcon className={'w-5 h-5'}/>}
                            </div>
                        </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
