import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IMAGE_CDN_URL } from '../utils/constants';
import PLACEHOLDER_IMAGE from '../assets/placeholder-light.png';

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, area, avgRating, maxDeliveryTime, costForTwoString }) => {
    return (
        <div className="card">
            <img src={IMAGE_CDN_URL + cloudinaryImageId} alt={name} 
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;   
                }} />
            <div>{name}</div>
            <div>{cuisines.join(", ")}</div>
            <div>{area}</div>
            <div className="card-footer">
                <div className='card-rating' style={{ backgroundColor: (Number(avgRating) >= 4) ? "rgb(72, 196, 121)" : (avgRating === '--') ? "rgb(209, 74, 40)" : "rgb(219, 124, 56)" }}>
                    <AiFillStar />
                    <div>{avgRating}</div>
                </div>
                <div>•</div>
                <div>{`${maxDeliveryTime} min`}</div>
                <div>•</div>
                <div>{costForTwoString}</div>
            </div>
        </div>
    )
}

export default React.memo(RestaurantCard);