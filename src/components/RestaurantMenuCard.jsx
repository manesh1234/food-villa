import React from 'react';
import { IMAGE_CDN_URL } from "../utils/constants";
import { AiFillStar } from 'react-icons/ai';
import PLACEHOLDER_IMAGE from '../assets/placeholder-light.png';
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const RestaurantMenuCard = ({ id, name, price, description, imageId, category, vegClassifier, ratings }) => {
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const indx = cartItems.findIndex(item => item.id === id);
    const clickHandler = (condition) => {
        const json = {
            'id': id,
            'name': name,
            'price': Math.floor(price / 100),
            'desciption': description,
            'cloudinaryImageId': imageId,
            'category': category,
            'attributes': vegClassifier
        }
        if (condition === '+') dispatch(addItem(json));
        else dispatch(removeItem(json));
    }
    const vegOrNonVeg = {
        width: '25px',
        height: '22px',
        border: `2px solid ${vegClassifier === "VEG" ? "#0f8a65" : "#e43b4f"}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    }
    return (
        <div className="restaurant-menu-card">
            <div className="restaurant-menu-card-left">
                <h2><div style={vegOrNonVeg}><div style={{ backgroundColor: `${vegClassifier === "VEG" ? "#0f8a65" : "#e43b4f"}` }}></div></div>{name}</h2>
                <h4>{category}</h4>
                <p>₹{price / 100}</p>
                {ratings?.aggregatedRating?.rating && (
                    <div className='card-rating' style={{ color: (Number(ratings?.aggregatedRating?.rating) >= 4) ? "rgb(7, 139, 59)" : (ratings?.aggregatedRating?.rating === '--') ? "rgb(209, 74, 40)" : "rgb(189, 104, 43)" }}>
                        <AiFillStar />
                        <div>{ratings?.aggregatedRating?.rating}</div>
                    </div>
                )}
                <h5>{description}</h5>
            </div>
            <div className="restaurant-menu-card-right">
                <div className="restaurant-menu-card-right-img">
                    <img src={imageId ? (IMAGE_CDN_URL + imageId) : PLACEHOLDER_IMAGE} alt={name} />
                </div>
                <div className="restaurant-menu-card-right-button">
                    {
                        (indx === -1) ?
                            <button onClick={() => clickHandler('+')}>ADD+</button> :
                            <div className="cart-handle-div">
                                <div onClick={() => clickHandler('-')}>-</div>
                                <div>{cartItems[indx].cnt}</div>
                                <div onClick={() => clickHandler('+')}>+</div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(RestaurantMenuCard);