import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";

const Container = ({ id, name, price, description, cloudinaryImageId, category, attributes }) => {
    const cartItems = useSelector(store => store.cart.items);
    const indx = cartItems.findIndex(item => item.id === id);
    const dispatch = useDispatch();
    const clickHandler = (condition) => {
        const json = {
            'id': id,
            'name': name,
            'price': price,
            'desciption': description,
            'cloudinaryImageId': cloudinaryImageId,
            'category': category,
            'attributes': attributes,
        }
        if (condition === '+') dispatch(addItem(json));
        else dispatch(removeItem(json));
    }
    return (
        <div className="cart-card-container">
            <div>{name}</div>
            <div className="cart-card-container-right">
                <div className="cart-card-container-price">
                    ₹{price}
                </div>
                {
                    <div className="cart-handle-div">
                        <div onClick={() => clickHandler('-')}>-</div>
                        <div>{cartItems[indx].cnt}</div>
                        <div onClick={() => clickHandler('+')}>+</div>
                    </div>
                }
            </div>
        </div>
    )
}

const CartCard = () => {
    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    const totalAmount = cartItems.reduce((acc, currVal) => acc + currVal.price * currVal.cnt, 0);
    const dispatch = useDispatch();
    return (
        <div className="cart-card">
            <div className="cart-card-header">
                <h3>Cart Items</h3>
                <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
            <div className="cart-card-content">
                {
                    cartItems.map(item => {
                        return <Container key={item.id} {...item} />
                    })
                }
            </div>
            <div style={{ width: '100%', border: '2px solid rgba(0,0,0,0.4)' }}></div>
            <div className="amount-block">
                <div>To Pay</div>
                <div style={{ fontWeight: 'bolder' }}>₹ {totalAmount}</div>
            </div>
        </div>
    )
}

export default CartCard;