"use client";
import {UserMessage} from "@/components/chat/user-message";
import {AssistantMessage} from "@/components/chat/assistant-message";
import {PaperAirplaneIcon} from "@heroicons/react/20/solid";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {DEFAULT_THREAD} from "@/constants";
import {Message, Thread} from "@/types";

export const Content = (
    props: {
        isReset: boolean,
        setIsReset: (isReset: boolean) => void
    }
) => {
    const [message, setMessage] = useState('')
    const [thread, setThread] = useState<Thread>(DEFAULT_THREAD)
    const [isAiTyping, setIsAiTyping] = useState(false)
    const scrollContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getIndex().then(() => null)
    }, []);

    useEffect(() => {
        if (props.isReset) {
            setThread(DEFAULT_THREAD)
            props.setIsReset(false)
        }
    }, [props, props.isReset]);

    useEffect(() => {
        scrollContentRef.current && scrollContentRef.current.scrollTo(0, scrollContentRef.current.scrollHeight)
    }, [thread.messages.length])

    const getIndex = async () => {
        const {data} = await axios.get(process.env.NEXT_PUBLIC_INDEX_API_URL + "kjzl6kcym7w8y9obp8tq6cqa5rgkkcyyohtxj83p8m1zr0m7fyjrwfiav4xi333")
        console.log('data', data)
    }
    const sendMessage = async () => {
        if (!message || isAiTyping) return
        const userMessage: Message = {
            role: 'user',
            content: message

        }
        const newThread: Thread = {
            ...thread,
            messages: [...thread.messages, userMessage]
        }
        setMessage('')
        setThread(newThread)

        await fetchData(newThread)
    }
    // const fetchEventStream = async () => {
    //     await fetchEventSource(process.env.NEXT_PUBLIC_INDEX_SEND_MESSAGE_API_URL as string, {
    //         method: 'POST',
    //         signal: controller.signal,
    //         body: JSON.stringify({
    //             messages: DEFAULT_THREAD.messages,
    //             id: DEFAULT_THREAD.id,
    //             indexes: DEFAULT_THREAD.indexes,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         onopen: async (res) => {
    //             console.log('Connection opened')
    //             // console.log(JSON.stringify(res))
    //             await res.json()
    //         },
    //         onclose: () => {
    //             console.log('Connection closed')
    //         },
    //         onmessage: async (event) => {
    //             console.log('event', event, JSON.stringify(event))
    //             const data = event.data
    //             console.log('data', data)
    //             if (!data) return
    //
    //             try {
    //                 const parsedData = JSON.parse(data)
    //                 console.log('parsedData', parsedData)
    //                 setData(parsedData.value)
    //             } catch (e) {
    //                 console.log(e)
    //             }
    //         },
    //         onerror: (err) => {
    //             console.log('err', err)
    //         }
    //     })
    // }

    const fetchData = async (thread: Thread) => {
        setIsAiTyping(true)
        const {data} = await axios.post(process.env.NEXT_PUBLIC_INDEX_SEND_MESSAGE_API_URL as string, thread)
        setThread((thread) => (
            {
                ...thread,
                messages: [...thread.messages, {
                    role: 'assistant',
                    content: data
                }]
            }
        ))
        setIsAiTyping(false)
    }

    const regenerateResponse = async () => {
        const newThread: Thread = {
            ...thread,
            messages: [...thread.messages.slice(0, thread.messages.length - 1)]
        }
        setThread(newThread)
        await fetchData(newThread)
    }
    const _handleKeyUp = async (e: any) => {
        if (e.key === 'Enter') {
            await sendMessage()
        }
    }

    return (
        <div className={'flex flex-col w-full mb-4 flex-1 overflow-hidden justify-between'}>
            <div className={'overflow-y-scroll mb-4'} ref={scrollContentRef}>
                {thread && thread.messages.length > 0 && thread.messages.map((message, index) => {
                    const isLast = index === thread.messages.length - 1
                    if (message.role === 'user') {
                        return <UserMessage key={index} message={message.content} isLast={false}/>
                    }
                    return <AssistantMessage key={index} message={message.content} isLast={isLast}
                                             regenerateResponse={regenerateResponse}/>
                })}

                {isAiTyping && <AssistantMessage message={""} isLast={true} isTyping={true}/>}
            </div>

            <div className={'border border-gray-200 rounded-md flex items-center justify-between px-4'}>
                <input
                    onKeyUp={_handleKeyUp}
                    type="text"
                    className={'mr-4 py-2 outline-0 w-full'}
                    placeholder={'Ask here anything...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} disabled={message === ''}>
                    <PaperAirplaneIcon
                        className={'h-5 w-5 transition text-gray-300 hover:text-gray-500 '}/>
                </button>
            </div>
        </div>
    )
}
