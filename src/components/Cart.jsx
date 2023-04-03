import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import empty_cart from '../assets/empty_cart.png';
import CartCard from "./CartCard";

export const EmptyCart = ({ atRestaurantMenu }) => {
    return (
        <div className="cart-empty">
            <div className="cart-empty-img">
                <img src={empty_cart} alt="empty-cart" />
            </div>
            {
                atRestaurantMenu ? <div>Good food is always cooking! Go ahead, order some yummy items from the menu.</div>
                    : <>
                        <h2>Your cart is empty !</h2>
                        <h5>You can go to home page to view more restaurants</h5>
                        <Link to='/' className="cart-empty-btn">SEE RESTAURANTS NEAR YOU</Link>
                    </>
            }
        </div>
    )
}

const Cart = () => {
    const cartItems = useSelector(store => store.cart.items);
    return cartItems.length === 0 ? <EmptyCart /> : (<div className="cart-main">
        <div className="cart-main-left">
            <div>To place order , Log In to your existing account or signup </div>
            <div className="cart-main-left-light-text">Have an account already ?</div>
            <button className="button">LOG IN</button>
            <div className="or-block">
                <div></div>
                <p>OR</p>
                <div></div>
            </div>
            <div className="cart-main-left-light-text">New to Food Villa ?</div>
            <button className="button">Sign Up</button>
        </div>
        <div className="cart-main-right">
            <CartCard />
        </div>
    </div>)
}

export default Cart;