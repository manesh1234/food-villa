import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import empty_cart from '../assets/empty_cart.png';
import CartCard from "./CartCard";
import usescreenWidth from "../utils/useScreenWidth";

export const EmptyCart = ({ atRestaurantMenu }) => {
    const screenwidth = usescreenWidth();
    return (
        <div className="cart-empty">
            <div className="cart-empty-card" style={{ gridTemplateColumns: screenwidth > 768 ? '1fr' : '1fr 1fr' }} >
                <div className="cart-empty-img">
                    <img src={empty_cart} alt="empty-cart" />
                </div>
                <div className="cart-empty-copy">
                    <span className="cart-empty-badge">Freshly waiting</span>
                    {atRestaurantMenu ? (
                        <>
                            <h2>Your cart is empty</h2>
                            <p>Good food is always cooking. Add a few favorites from the menu and we’ll keep them warm for you.</p>
                        </>
                    ) : (
                        <>
                            <h2>Your cart is empty</h2>
                            <p>Fill it with your favorite restaurants and dishes before checkout.</p>
                        </>
                    )}
                    <Link to='/' className="cart-empty-btn">Browse restaurants</Link>
                </div>
            </div>
        </div>
    )
}

const Cart = () => {
    const cartItems = useSelector(store => store.cart.items);

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="cart-main">
            <section className="cart-main-left">
                <div className="cart-benefits">
                    <span className="cart-empty-badge">Cart ready</span>
                    <h2>Review your selected dishes</h2>
                    <p>Adjust quantities, remove anything you do not want, and continue to checkout whenever you are ready.</p>
                </div>
                <div className="cart-benefit-pills">
                    <span>🛍️ Easy review</span>
                    <span>⚡ Quick updates</span>
                    <span>🚚 Smooth checkout</span>
                </div>
            </section>
            <section className="cart-main-right">
                <CartCard />
            </section>
        </div>
    )
}

export default Cart;