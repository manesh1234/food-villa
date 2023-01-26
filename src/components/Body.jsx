import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import Offline from "./Offline";

function filterData(searchText, restaurants) {
    return restaurants.filter((restaurant) =>
        restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    )
}

const Body = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchText, setSearchText] = useState('');

    const liveFilter = (e) => {
        setSearchText(e.target.value);
        if (e.target.value !== '') {
            const data = filterData(e.target.value, allRestaurants);
            setFilteredRestaurants(data);
        }
        else setFilteredRestaurants(allRestaurants);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${position?.coords?.latitude}&lng=${position?.coords?.longitude}&page_type=DESKTOP_WEB_LISTING`)
                .then(response => response.json())
                .then(data => {
                    setAllRestaurants(data?.data?.cards[2]?.data?.data?.cards);
                    setFilteredRestaurants(data?.data?.cards[2]?.data?.data?.cards);
                })
        })
    }, [])

    const isOnline = useOnline();
    if (!isOnline) return <Offline />;

    return (
        <>
            <div className="search-box">
                <input type="text" name="search" id="search" value={searchText} onChange={e => liveFilter(e)} placeholder="Search for restaurants and food" />
            </div>
            <div className="body">
                {
                    allRestaurants?.length === 0 ? (<Shimmer />) :
                        filteredRestaurants?.length > 0 ? (filteredRestaurants.map(restaurant => {
                            return <Link to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id}><RestaurantCard {...restaurant.data} /></Link>
                        })) : (<h2 className="no-results">We didn't find any matching results for "{searchText}"</h2>)
                }
            </div>
        </>
    )
}

export default Body;