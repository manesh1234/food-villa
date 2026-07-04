import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import Body from "./components/Body";
import HeaderComponent, { Modal } from './components/Header';
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./utils/store";
import UserAuth from "./utils/UserAuth";
import { Bars } from "react-loader-spinner";
import './index.css';

const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Profile = lazy(() => import("./components/Profile"));

const LazyFallback = () => (
    <div className="loading" style={{ minHeight: '80vh' }}>
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            visible={true}
        />
    </div>
);

const ErrorRedirect = () => <Navigate to="/" replace />;

const AppLayout = () => {
    const [userAuth, setUserAuth] = useState({
        name: null,
        email: null,
        userId: null,
    });
    const [modalObject, setModalObject] = useState({
        modal: false,
        loading: false
    })
    const getInitialCity = () => {
        const storedCity = localStorage.getItem('selectedCity');
        if (!storedCity) return null;

        try {
            const parsedCity = JSON.parse(storedCity);
            if (!parsedCity) return null;
            if (typeof parsedCity === 'string') return { name: parsedCity };
            if (typeof parsedCity === 'object' && 'name' in parsedCity) return parsedCity;
            return null;
        } catch (error) {
            return null;
        }
    };

    const initialCity = useMemo(() => getInitialCity(), []);
    const [cityPopup, setCityPopup] = useState(initialCity ? false : true);
    const [city, setCity] = useState(initialCity);

    useEffect(() => {
        const usrInfo = localStorage.getItem('userInfo');
        if (usrInfo) {
            const obj = JSON.parse(usrInfo);
            setUserAuth(prev => ({ ...prev, ...obj }));
        }
    }, []);

    const providerValue = useMemo(() => ({
        userAuth,
        setUserAuth,
        modalObject,
        setModalObject,
        cityPopup,
        setCityPopup,
        city,
        setCity
    }), [userAuth, modalObject, cityPopup, city]);

    return (
        <Provider store={store}>
            <UserAuth.Provider value={providerValue} >
                <div className="main-block">
                    <HeaderComponent />
                    <Outlet />
                    <Footer />
                </div>
                {
                    modalObject.modal &&
                    <>
                        <div className='overlay'></div>
                        <Modal />
                    </>
                }
                {
                    modalObject.loading &&
                    <>
                        <div className="loading"><Bars
                            height="120"
                            width="120"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /></div>
                    </>
                }
            </UserAuth.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorRedirect />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <Suspense fallback={<LazyFallback />}><About /></Suspense>,
            },
            {
                path: "/contact",
                element: <Suspense fallback={<LazyFallback />}><Contact /></Suspense>
            },
            {
                path: "/restaurant/:id",
                element: <Suspense fallback={<LazyFallback />}><RestaurantMenu /></Suspense>
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/profile/:userId?",
                element: <Suspense fallback={<LazyFallback />}><Profile /></Suspense>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<RouterProvider router={appRouter} future={{ v7_startTransition: true }} />);