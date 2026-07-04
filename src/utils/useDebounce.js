import { useRef, useCallback } from "react";

/**
 * Custom hook for debouncing function calls
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
const useDebounce = (callback, delay = 500) => {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback((...args) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
};

export default useDebounce;
