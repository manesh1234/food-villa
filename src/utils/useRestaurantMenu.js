import { useState, useEffect } from "react";
import { GET_RESTAURANT_MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!resId) return;

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(GET_RESTAURANT_MENU_URL(resId), { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setRestaurant(data?.data || null);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setRestaurant(null);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [resId]);

    return { restaurant, error, loading };
};

export default useRestaurantMenu;