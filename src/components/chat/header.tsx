"use client";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import {ProfilePicture} from "@/components/global/profile-picture";

export const Header = (props: {
    resetIndex: () => void
}) => {
    return (
        <div className={'w-full flex justify-between items-center py-4'}>
            <div
                className={'text-sm bg-gray-200 flex gap-2 items-center px-2 py-1.5 rounded-sm cursor-pointer transition hover:bg-gray-300'}
                onClick={props.resetIndex}
            >
                <ArrowPathIcon className={'w-4 h-4'}/>
                Reset
            </div>
            <ProfilePicture className={'w-8 h-8'}/>
        </div>
    )
}
