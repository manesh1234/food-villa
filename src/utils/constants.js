
export const IMAGE_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// export const BASE_API_URL = "http://localhost:8080"; // Local backend URL
export const BASE_API_URL = "https://foodvillabackend.vercel.app"; // Deployed backend URL

export const SIGN_IN_URL = `${BASE_API_URL}/auth/login`;
export const SIGN_UP_URL = `${BASE_API_URL}/auth/signup`;
export const UPDATE_USER = `${BASE_API_URL}/auth/update-user`;

export const GET_CITY_COORDS_URL = (city) => `${BASE_API_URL}/restaurants/getCityCoords?city=${encodeURIComponent(city)}`;
export const GET_ALL_RESTAURANTS_BY_CITY_URL = (city) => `${BASE_API_URL}/restaurants/getAllRestaurants?city=${encodeURIComponent(city)}`;
export const GET_ALL_RESTAURANTS_BY_GEO_URL = (lat, lng) => `${BASE_API_URL}/restaurants/getAllRestaurants?lat=${lat}&lng=${lng}`;
export const GET_RESTAURANT_MENU_URL = (resId) => `${BASE_API_URL}/restaurants/getRestaurantMenu/${resId}`;
