import useScreenWidth from "../utils/useScreenWidth"

const HeadPart = () => {
    return (
        <div className="shimmer-menu-head">
            <div className="shimmer-menu-head-left"></div>
            <div className="shimmer-menu-head-right">
                <div className="shimmer-menu-head-right-1"></div>
                <div className="shimmer-menu-head-right-2"></div>
                <div className="shimmer-menu-head-right-3"></div>
            </div>
        </div>
    )
}

const ShimmerMenuCard = () => {
    return (
        <div className="shimmer-menu-card">
            <div className="shimmer-menu-card-left">
                <div className="shimmer-menu-head-right-3"></div>
                <div className="shimmer-menu-head-right-2"></div>
                <div className="shimmer-menu-head-right-1"></div>
            </div>
            <div className="shimmer-menu-card-right"></div>
        </div>
    )
}

const ShimmerMenu = () => {
    const screenWidth = useScreenWidth();
    return (
        <>
            <HeadPart />
            <div className="restaurant-menu-cards-wrap">
                <div className="restaurant-menu-cards">
                    {
                        Array(10).fill('').map((item, index) => {
                            return <ShimmerMenuCard key={index} />
                        })
                    }
                </div>
                {
                    screenWidth > 700 && <div className="restaurant-menu-cart-shimmer"></div>
                }
            </div>
        </>
    )
}

export default ShimmerMenu;