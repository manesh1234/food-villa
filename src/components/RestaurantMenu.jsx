import { useState } from 'react';
import CartCard from './CartCard';
import { EmptyCart } from './Cart';
import ShimmerMenu from './ShimmerMenu';
import { useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import { useParams, Link } from 'react-router-dom';
import { BsXCircleFill } from 'react-icons/bs';
import { MdRestaurantMenu } from 'react-icons/md';
import { IMAGE_CDN_URL } from '../utils/constants';
import { IoLocationOutline } from "react-icons/io5";
import useScreenWidth from '../utils/useScreenWidth';
import RestaurantMenuCard from "./RestaurantMenuCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import PLACEHOLDER_IMAGE from '../assets/placeholder-light.png';

const RestaurantMenu = () => {
    const { id } = useParams();
    const { restaurant, error, loading } = useRestaurantMenu(id);
    const cartItems = useSelector(store => store.cart.items);
    const screenWidth = useScreenWidth();
    const [searchText, setSearchText] = useState('');
    const restaurantInfo = restaurant?.restaurantInfo || {};

    if (loading) return <ShimmerMenu />;
    if (error) return <h2 className="no-results">Error loading restaurant: {error}</h2>;
    if (!restaurant) return <ShimmerMenu />;

    const allFilteredSections = restaurant?.menu?.cards
        ? Object.values(restaurant.menu.cards) : [];

    const normalizedSearchText = searchText.trim().toLowerCase();
    const sectionMatches = (item) => {
        if (!normalizedSearchText) return true;
        return String(item?.name || '').toLowerCase().includes(normalizedSearchText);
    };

    const filteredSections = allFilteredSections.map(section => {
        const items = section?.items?.filter(sectionMatches);
        return { ...section, items };
    }).filter(section => section.items.length > 0);

    const totalMenuItems = filteredSections.reduce(
        (total, section) => total + (section?.menuItems?.length || section?.items?.length || 0),
        0
    );
    const totalCartItems = cartItems.reduce((total, item) => total + item.cnt, 0);
    const totalCartValue = cartItems.reduce((total, item) => total + item.price * item.cnt, 0);

    return (
        <>
            <div className="restaurant-menu-main">
                <img height='200px' width='200px' src={IMAGE_CDN_URL + restaurantInfo?.cloudinaryImageId} alt={restaurantInfo?.restaurantName} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                }} />
                <div className="restaurant-menu-main-text-block">
                    <h3>{restaurantInfo?.restaurantName}</h3>
                    <h4>{restaurantInfo?.area}</h4>
                    <div>{restaurantInfo?.cuisines?.join(', ')}</div>
                    <div className="card-footer">
                        <div className='card-rating' style={{ backgroundColor: (Number(restaurantInfo?.avgRating) >= 4) ? "rgb(72, 196, 121)" : (restaurantInfo?.avgRating === '--') ? "rgb(247, 27, 46)" : "rgb(219, 124, 56)" }}>
                            <AiFillStar />
                            <div>{restaurantInfo?.avgRating}</div>
                        </div>
                        <div>|</div>
                        <div><IoLocationOutline /> {restaurantInfo?.city}</div>
                        <div>|</div>
                        <div>{restaurantInfo?.costForTwoString}</div>
                    </div>
                </div>
            </div>


            <div className='restaurant-menu-cards-wrap'>
                <div className='restaurant-menu-cards'>
                    <h2 className='menu-heading'><MdRestaurantMenu /> MENU</h2>
                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                placeholder="Search for restaurant menu items..."
                            />
                            {
                                searchText && (
                                    <BsXCircleFill
                                        className="clear-search"
                                        onClick={() => setSearchText('')}
                                    />
                                )
                            }
                        </div>
                        <h3 className="items-found">
                            {totalMenuItems} items found
                        </h3>
                    </div>
                    {
                        !filteredSections.length ? (<h2 className="no-results">We didn't find any matching results for "{searchText}"</h2>)
                            : (
                                filteredSections.map((section, index) => (
                                    <details open key={index}
                                        className="restaurant-menu-section">
                                        <summary className="restaurant-menu-title">
                                            <div className="restaurant-menu-title-row">
                                                <h4 className="titles">
                                                    {section?.title} ({section?.items?.length})
                                                </h4>
                                                <span className="dropdown-icon">▼</span>
                                            </div>
                                        </summary>
                                        <div className="restaurant-menu-items">
                                            {
                                                section?.items?.map(menuItem => (
                                                    <RestaurantMenuCard
                                                        {...menuItem}
                                                        key={menuItem?.id}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </details>
                                ))
                            )
                    }
                </div>
                {
                    screenWidth > 950 && <div className='restaurant-menu-cart'>
                        {
                            cartItems.length === 0 ? <EmptyCart atRestaurantMenu={true} /> : <CartCard />
                        }
                    </div>
                }
            </div>
            {cartItems.length > 0 && screenWidth <= 950 && (
                <Link to="/cart" className="mobile-cart-float">
                    <div className="mobile-cart-float-content">
                        <div className="mobile-cart-float-copy">
                            <span className="mobile-cart-float-badge">{totalCartItems} item{totalCartItems === 1 ? '' : 's'}</span>
                            <div className="mobile-cart-float-title">Go to cart</div>
                            <div className="mobile-cart-float-preview">
                                {cartItems.slice(0, 2).map(item => (
                                    <span key={item.id}>{item.name}</span>
                                ))}
                                {cartItems.length > 2 && <span>+{cartItems.length - 2} more</span>}
                            </div>
                        </div>
                        <div className="mobile-cart-float-price">₹{totalCartValue}</div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default RestaurantMenu;