import { useParams } from 'react-router-dom';
import { IMAGE_CDN_URL } from '../utils/constants';
import { AiFillStar } from 'react-icons/ai';
import ShimmerMenu from './ShimmerMenu';
import RestaurantMenuCard from "./RestaurantMenuCard";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import CartCard from './CartCard';
import { useSelector } from 'react-redux';
import { EmptyCart } from './Cart';
import useScreenWidth from '../utils/useScreenWidth';

const RestaurantMenu = () => {
    const { id } = useParams();
    const restaurant = useRestaurantMenu(id);
    const cartItems = useSelector(store => store.cart.items);
    const screenWidth = useScreenWidth();
    return !restaurant ? <ShimmerMenu /> : (
        <>
            <div className="restaurant-menu-main">
                <img src={IMAGE_CDN_URL + restaurant.cloudinaryImageId} alt={restaurant.name} />
                <div className="restaurant-menu-main-text-block">
                    <h2>{restaurant.name}</h2>
                    <h3>{restaurant.area}</h3>
                    <div>{restaurant.cuisines.join(', ')}</div>
                    <div className="card-footer">
                        <div className='card-rating' style={{ backgroundColor: (Number(restaurant.avgRating) >= 4) ? "rgb(72, 196, 121)" : (restaurant.avgRating === '--') ? "rgb(247, 27, 46)" : "rgb(219, 124, 56)" }}>
                            <AiFillStar />
                            <div>{restaurant.avgRating}</div>
                        </div>
                        <div>|</div>
                        <div>{`${restaurant.city}`}</div>
                        <div>|</div>
                        <div>{restaurant?.costForTwoMsg}</div>
                    </div>
                </div>
            </div>
            <div className="restaurant-menu-recommendation">
                Recommended <h3>{Object.values(restaurant.menu.items).length} Items</h3>
            </div>
            <div className='restaurant-menu-cards-wrap'>
                <div className="restaurant-menu-cards">
                    {
                        Object.values(restaurant?.menu?.items).map(item => {
                            return <RestaurantMenuCard {...item} key={item.id} />
                        })
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
        </>
    )
}

export default RestaurantMenu;