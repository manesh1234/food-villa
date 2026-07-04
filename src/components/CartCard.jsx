import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";

const Container = ({ id, name, price, description, cloudinaryImageId, category, attributes }) => {
    const cartItems = useSelector(store => store.cart.items);
    const item = cartItems.find(item => item.id === id);
    const dispatch = useDispatch();

    const clickHandler = (condition) => {
        const json = {
            id,
            name,
            price,
            description,
            cloudinaryImageId,
            category,
            attributes,
        };

        if (condition === '+') {
            dispatch(addItem(json));
        } else {
            dispatch(removeItem(json));
        }
    };

    if (!item) {
        return null;
    }

    return (
        <div className="cart-card-container">
            <div className="cart-item-info">
                <strong>{name}</strong>
                <p>{description || category || "Freshly prepared"}</p>
            </div>
            <div className="cart-card-container-right">
                <div className="cart-card-container-price">₹{price}</div>
                <div className="cart-handle-div">
                    <button type="button" onClick={() => clickHandler('-')}>−</button>
                    <span>{item.cnt}</span>
                    <button type="button" onClick={() => clickHandler('+')}>+</button>
                </div>
            </div>
        </div>
    )
}

const CartCard = () => {
    const cartItems = useSelector(store => store.cart.items);
    const totalAmount = cartItems.reduce((acc, currVal) => acc + currVal.price * currVal.cnt, 0);
    const deliveryFee = totalAmount > 0 ? 40 : 0;
    const grandTotal = totalAmount + deliveryFee;
    const dispatch = useDispatch();

    return (
        <div className="cart-card">
            <div className="cart-card-header">
                <div>
                    <h3>Cart Items</h3>
                    <p>{cartItems.length} dish{cartItems.length === 1 ? "" : "es"} selected</p>
                </div>
                <button type="button" onClick={() => dispatch(clearCart())}>Clear cart</button>
            </div>
            <div className="cart-card-content">
                {cartItems.map(item => (
                    <Container key={item.id} {...item} />
                ))}
            </div>
            <div className="cart-summary">
                <div className="amount-block">
                    <span>Subtotal</span>
                    <strong>₹{totalAmount}</strong>
                </div>
                <div className="amount-block">
                    <span>Delivery</span>
                    <strong>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</strong>
                </div>
                <div className="amount-block amount-block-total">
                    <span>Total</span>
                    <strong>₹{grandTotal}</strong>
                </div>
            </div>
        </div>
    )
}

export default CartCard;