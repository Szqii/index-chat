"use client";

import {ProfilePicture} from "@/components/global/profile-picture";

interface UserMessageProps {
    message: string;
    isLast: boolean;
}

export const UserMessage = ({message, isLast}: UserMessageProps) => {
    return (
        <div className={'w-full flex items-center py-6' + (!isLast ? ' border-b border-gray-200' : '')}>
            <ProfilePicture className={'w-6 h-6 mr-3 self-start'}/>
            <div className={'w-full break-words overflow-x-clip'}>
                {message}
            </div>
        </div>
    )
}
