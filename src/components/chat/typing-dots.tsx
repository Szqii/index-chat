import {MutableRefObject, useEffect, useRef, useState} from "react";

export const TypingDot = () => {
    const [typingDot, setTypingDotCustom] = useState<string>("")
    const typingDotRef: MutableRefObject<string> = useRef(typingDot)
    const intervalRef: MutableRefObject<NodeJS.Timeout> = useRef(null as any)

    const setTypingDot = (typingDot: string) => {
        typingDotRef.current = typingDot
        setTypingDotCustom(typingDot)
    }
    useEffect(() => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            const dot3 = " . . ."
            const dot2 = " . ."
            const dot1 = " ."
            const dot0 = ""

            switch (typingDotRef.current) {
                case dot3:
                    setTypingDot(dot0)
                    break
                case dot2:
                    setTypingDot(dot3)
                    break
                case dot1:
                    setTypingDot(dot2)
                    break
                default:
                    setTypingDot(dot1)
                    break
            }
        }, 250)
    }, [])

    return (
        <span>{typingDot}</span>
    )
}
