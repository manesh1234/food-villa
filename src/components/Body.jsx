import { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import { toast } from 'react-toastify';
import Shimmer from "./Shimmer";
import Offline from "./Offline";
import { Link } from "react-router-dom";
import UserAuth from '../utils/UserAuth';
import RestaurantCard from "./RestaurantCard"
import useOnline from "../utils/useOnline";
import { GET_ALL_RESTAURANTS_BY_CITY_URL, GET_ALL_RESTAURANTS_BY_GEO_URL } from '../utils/constants';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';
import unservicableLocationImage from '../assets/unservicable_location.png';

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { setCityPopup, setCity, city } = useContext(UserAuth);
    const controllerRef = useRef(null);

    const getSavedCityName = useCallback(() => {
        const item = localStorage.getItem('selectedCity');
        if (!item) return '';
        try {
            const parsed = JSON.parse(item);
            if (parsed && typeof parsed === 'object' && 'name' in parsed) return parsed.name || '';
            return String(parsed) || '';
        } catch (e) {
            return item;
        }
    }, []);

    const toastCityRef = useRef(getSavedCityName());

    const showCityToast = useCallback((cityName, isSuccessful) => {
        if (!cityName || toastCityRef.current === cityName) return;
        toast[isSuccessful ? 'success' : 'warning'](isSuccessful ? `Successfully fetched restaurants for ${cityName}!` : `Currently ${cityName} is not serviceable.`, {
            className: "custom-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        });
        toastCityRef.current = cityName;
        localStorage.setItem('selectedCity', JSON.stringify({ name: cityName }));
    }, []);

    useEffect(() => {
        // Abort previous requests
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();

        const fetchRestaurants = async (url) => {
            try {
                const response = await fetch(url, { signal: controllerRef.current.signal });
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                const data = await response.json();
                if (data?.data && Array.isArray(data.data)) {
                    setAllRestaurants(data.data);
                    const cityName = data.data[0]?.city || city?.name;
                    if (cityName) showCityToast(cityName, data.data[0]?.status !== 'unserviceable');
                    if (!city || typeof city === 'string' || !city.name) setCity({ name: cityName });
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setAllRestaurants([]);
                    toast.error(err.message || 'Failed to fetch restaurants', {
                        className: "custom-toast",
                        draggable: true,
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
        };

        if (city && city.name) {
            setCityPopup(false);
            fetchRestaurants(GET_ALL_RESTAURANTS_BY_CITY_URL(city.name));
        } else if ("geolocation" in navigator) {
            setCityPopup(false);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const url = GET_ALL_RESTAURANTS_BY_GEO_URL(position.coords.latitude, position.coords.longitude);
                    fetchRestaurants(url);
                },
                () => setCityPopup(true)
            );
        } else {
            setCityPopup(true);
        }

        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, [city, setCityPopup, setCity, showCityToast]);

    // Memoize filtered restaurants - must be before any early returns
    const filteredRestaurants = useMemo(() => {
        return allRestaurants.filter(restaurant =>
            restaurant?.name?.toLowerCase()?.includes(searchText.toLowerCase())
        );
    }, [allRestaurants, searchText]);

    const isOnline = useOnline();
    if (!isOnline) return <Offline />;
    if (allRestaurants?.[0]?.status === 'unserviceable')
        return (<div className="unservicable-location">
            <img src={unservicableLocationImage} alt="Unservicable Location" />
        </div>);

    return (
        <>
            <div className="search-box">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search for restaurants and food"
                    aria-label="Search restaurants"
                />
                {
                    (!searchText && <BsSearch className="search-icon" />) || (searchText && <BsXCircleFill
                        className="search-icon" style={{ cursor: "pointer" }} onClick={() => setSearchText('')}
                    />)
                }
            </div>
            <div className="body">
                {
                    !allRestaurants?.length ? (<Shimmer />) :
                        filteredRestaurants?.length ? (filteredRestaurants.map(restaurant => {
                            return <Link to={"/restaurant/" + restaurant.restaurantId} key={restaurant.restaurantId}><RestaurantCard {...restaurant} /></Link>
                        })) : (<h2 className="no-results">We didn't find any matching results for "{searchText}"</h2>)
                }
            </div>
        </>
    )
}

export default Body;