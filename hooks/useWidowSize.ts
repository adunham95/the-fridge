import { useEffect, useState } from "react";

interface IWindowSize{
    readonly height: number,
    readonly width: number,
}

export function useWindowSize() : IWindowSize{

    const [windowSize, setWindowSize] = useState({
        width: 1200,
        height: 1200,
    })

    useEffect(()=>{
        if(typeof window !== "undefinded"){
            function handleResize(){
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }

            window.addEventListener('resize', handleResize)

            handleResize()

            return () => window.removeEventListener('resize', handleResize)
        }
    },[]);

    return windowSize
}