import { useEffect, useState } from "react";

interface IWindowSize{
    readonly height: number,
    readonly width: number,
}

export function useWindowSize() : IWindowSize{
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(()=>{
        function handleResize(){
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    },[]);

    return windowSize
}