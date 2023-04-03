import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
    const [restaurant, setRestaurant] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // fetch(`https://www.swiggy.com/dapi/menu/v4/full?${position.coords.latitude}&lng=${position.coords.longitude}&menuId=${resId}`)
                fetch(`https://restaurants-api-9zvz.onrender.com/restaurants/${resId}`)
                    .then(response => response.json())
                    .then(data => {
                        setRestaurant(data?.menu?.data);
                    })
            })
        }
    }, [resId])
    return restaurant;
}

export default useRestaurantMenu;