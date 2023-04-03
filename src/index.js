import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import HeaderComponent, { Modal } from './components/Header';
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./utils/store";
import './index.css';
import UserAuth from "./utils/UserAuth";
import Profile from "./components/Profile";
import { Bars } from "react-loader-spinner";

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
    useEffect(() => {
        const usrInfo = localStorage.getItem('userInfo');
        if (usrInfo) {
            const obj = JSON.parse(usrInfo);
            setUserAuth({ ...userAuth, ...obj });
        }
    }, []);
    return (
        <Provider store={store}>
            <UserAuth.Provider value={{
                userAuth: userAuth,
                setUserAuth: setUserAuth,
                modalObject: modalObject,
                setModalObject: setModalObject
            }} >
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
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantMenu />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<RouterProvider router={appRouter} />);