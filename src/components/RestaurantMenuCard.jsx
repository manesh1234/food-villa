import { IMAGE_CDN_URL } from "../Constants";
import imageNotFound from '../assets/imageNotFound.png';

const RestaurantMenuCard = ({ name, price, description, cloudinaryImageId, category, attributes }) => {
    price = price.toString();
    const vegOrNonVeg = {
        width: '25px',
        height: '22px',
        border: `2px solid ${attributes.vegClassifier === "VEG" ? "#0f8a65" : "#e43b4f"}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    }
    return (
        <div className="restaurant-menu-card">
            <div className="restaurant-menu-card-left">
                <h2><div style={vegOrNonVeg}><div style={{ backgroundColor: `${attributes.vegClassifier === "VEG" ? "#0f8a65" : "#e43b4f"}` }}></div></div>{name}</h2>
                <h4>{category}</h4>
                <p>₹{price.slice(0, price.length - 2)}{".00"}</p>
                <h5>{description}</h5>
                <div>{attributes.accompaniments}</div>
            </div>
            <div className="restaurant-menu-card-right">
                <div className="restaurant-menu-card-right-img">
                    <img src={cloudinaryImageId ? (IMAGE_CDN_URL + cloudinaryImageId) : imageNotFound} alt={name} />
                </div>
                <div className="restaurant-menu-card-right-button">
                    <button>ADD+</button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenuCard;