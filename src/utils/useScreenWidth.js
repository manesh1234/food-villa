import { useState, useEffect, useCallback } from "react";

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleReSize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        let timeoutId;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleReSize, 30);
        };

        window.addEventListener('resize', debouncedResize);
        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, [handleReSize]);

    return screenWidth;
};

export default useScreenWidth;