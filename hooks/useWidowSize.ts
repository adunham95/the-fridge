import { useEffect, useState } from "react";

interface IWindowSize{
    // eslint-disable-next-line prettier/prettier
    readonly height: number,
    readonly width: number,
}

export function useWindowSize() : IWindowSize{

    const [windowSize, setWindowSize] = useState({
        width: 1200,
        height: 1200,
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