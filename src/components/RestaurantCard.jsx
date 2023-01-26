import { IMAGE_CDN_URL } from '../Constants';
import { AiFillStar } from 'react-icons/ai';

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, area, avgRating, maxDeliveryTime, costForTwoString }) => {
    return (
        <div className="card">
            <img src={IMAGE_CDN_URL + cloudinaryImageId} alt="" />
            <div>{name}</div>
            <div>{cuisines.join(", ")}</div>
            <div>{area}</div>
            <div className="card-footer">
                <div className='card-rating' style={{ backgroundColor: (Number(avgRating) >= 4) ? "rgb(72, 196, 121)" : (avgRating === '--') ? "rgb(189, 35, 15)" : "rgb(219, 124, 56)" }}>
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

export default RestaurantCard;