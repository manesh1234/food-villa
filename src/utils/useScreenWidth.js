import { useState, useEffect } from "react";

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleReSize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleReSize);
        return () => {
            window.removeEventListener('resize', handleReSize);
        }
    }, [])
    return screenWidth;
}

export default useScreenWidth;