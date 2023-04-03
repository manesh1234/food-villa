import { IMAGE_CDN_URL } from "../utils/constants";
import imageNotFound from '../assets/imageNotFound.png';
import { useSelector,useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const RestaurantMenuCard = ({ id, name, price, description, cloudinaryImageId, category, attributes }) => {
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const indx = cartItems.findIndex(item => item.id === id);
    const clickHandler = (condition) => {
        const json = {
            'id': id,
            'name': name,
            'price': Math.floor(price/100),
            'desciption': description,
            'cloudinaryImageId': cloudinaryImageId,
            'category': category,
            'attributes': attributes,
        }
        if(condition==='+') dispatch(addItem(json));
        else dispatch(removeItem(json));
    }
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
                <p>₹{price/100}</p>
                <h5>{description}</h5>
                <div>{attributes.accompaniments}</div>
            </div>
            <div className="restaurant-menu-card-right">
                <div className="restaurant-menu-card-right-img">
                    <img src={cloudinaryImageId ? (IMAGE_CDN_URL + cloudinaryImageId) : imageNotFound} alt={name} />
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

export default RestaurantMenuCard;