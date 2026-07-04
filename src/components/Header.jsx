import { useRef, useState, useContext, useEffect } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import logo from "../assets/logo.png";
import { BsList } from 'react-icons/bs';
import UserAuth from '../utils/UserAuth';
import { useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import loginImg from "../assets/login-img.png";
import 'react-toastify/dist/ReactToastify.css';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import useScreenWidth from '../utils/useScreenWidth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SIGN_IN_URL, SIGN_UP_URL, GET_CITY_COORDS_URL } from '../utils/constants';
import { IoLocationOutline, IoLocationSharp, IoSearch, IoChevronForward } from "react-icons/io5";
import { AiOutlineShoppingCart, AiFillHome, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';


const Title = () => {
    const cities = [
        { name: 'Hyderabad' },
        { name: 'Bangalore' },
        { name: 'Mumbai' },
        { name: 'Delhi' },
        { name: 'Kolkata' },
        { name: 'Chennai' }
    ];
    const { city, setCity, cityPopup, setCityPopup } = useContext(UserAuth);
    const [showCityPopup, setShowCityPopup] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const [filteredCities, setFilteredCities] = useState(cities);
    const debounceRef = useRef(null);
    const controllerRef = useRef(null);
    const pageLocation = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setShowCityPopup(cityPopup);
    }, [cityPopup]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, []);

    const handleCityClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowCityPopup(true);
    }

    const handleCitySearch = (e) => {
        const value = e.target.value;
        setCitySearch(value);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        if (!value.trim()) {
            setFilteredCities(cities);
            return;
        }

        // Abort previous request
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();

        debounceRef.current = setTimeout(async () => {
            try {
                const response = await fetch(GET_CITY_COORDS_URL(value.trim()), {
                    signal: controllerRef.current.signal
                });
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                const data = await response.json();
                setFilteredCities(data?.data || []);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch cities:', error);
                    setFilteredCities(cities);
                }
            }
        }, 500);
    }

    const handleCitySelect = (selectedCity) => {
        setCitySearch('');
        setFilteredCities(cities);
        setCity(selectedCity);
        setShowCityPopup(false);
        setCityPopup(false);
        localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
        if (pageLocation.pathname !== '/') {
            navigate('/');
        }
    }

    const handleClosePopup = () => {
        setCitySearch('');
        setFilteredCities(cities);
        setShowCityPopup(false);
        setCityPopup(false);
    }

    return (
        <div className="header-logo">
            <Link to="/" className="header-logo-link">
                <h1><pre>Food Villa</pre></h1>
                <div className="header-logo-img">
                    <img src={logo} alt="logo"></img>
                </div>
            </Link>
            {
                city?.name && <h2 onClick={handleCityClick} className='matchedcity'>📍{city.name}</h2>
            }
            {
                showCityPopup && (
                    <div className="city-popup-overlay">
                        <div className="city-popup">
                            <div className="city-popup-header">
                                <div className="city-header-left">
                                    <IoLocationOutline className="city-location-icon" />
                                    <div>
                                        <h2>Select City</h2>
                                        <p>Find restaurants and food near you</p>
                                    </div>
                                </div>
                                {city?.name && (
                                    <div className="close-popup"
                                        onClick={handleClosePopup} >
                                        <RxCross1 />
                                    </div>
                                )}
                            </div>

                            <div className="city-search-box">
                                <IoSearch className="city-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search city..."
                                    value={citySearch}
                                    onChange={handleCitySearch}
                                    className="city-search-input" />
                            </div>

                            <div className="city-results">
                                {
                                    filteredCities.length > 0 ? (
                                        filteredCities.map((city, index) => (
                                            <div key={index} className="city-item" onClick={() => handleCitySelect(city)}>
                                                <div className="city-item-left">
                                                    <div className="city-icon-circle">
                                                        <IoLocationSharp />
                                                    </div>
                                                    <div className="city-name">
                                                        {city.name}
                                                    </div>
                                                </div>
                                                <IoChevronForward className="city-arrow" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-city-found">
                                            <div className="no-city-icon">
                                                <IoLocationOutline />
                                                <h3>No cities found</h3>
                                            </div>
                                            <p>Try searching with another city name</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export const Modal = () => {
    const [modalObj, setModalObj] = useState({
        isLogin: true,
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    })
    const { userAuth, setUserAuth, modalObject, setModalObject } = useContext(UserAuth);
    const modalToggle = (state) => {
        if (state) {
            setModalObject({ ...modalObject, modal: true });
            document.body.style.overflow = 'hidden';
        }
        else {
            setModalObject({ ...modalObject, modal: false });
            document.body.style.overflow = '';
        }
    }
    const closeLoading = () => {
        setModalObject({ ...modalObject, loading: false });
    }
    const emptyModal = (revertNeeded) => {
        for (let key in modalObj) {
            if (key !== 'isLogin') {
                modalObj[key] = '';
            }
        }
        modalObj.isLogin = !modalObj.isLogin;
        revertNeeded && (modalObj.isLogin = !modalObj.isLogin);
        setModalObj({ ...modalObj });
    }
    const popUps = (success, msg) => {
        if (success) {
            toast.success(msg, {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_LEFT,
            });
        }
        else {
            toast.error(msg, {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setModalObject(prev => ({ ...prev, loading: true }));
        const payload = modalObj.isLogin
            ? { email: modalObj.email, password: modalObj.password }
            : { name: modalObj.name, email: modalObj.email, password: modalObj.password };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };

        if (modalObj.isLogin) {
            fetch(SIGN_IN_URL, requestOptions)
                .then(response => response.json())
                .then(obj => {
                    closeLoading();
                    if (obj.message === 'Bad request' || obj.message === 'Authentication failed, Invalid email or password') {
                        popUps(false, obj?.error?.details[0]?.message || obj.message);
                        emptyModal(true);
                        return;
                    }
                    else if (obj.message === 'login Successful') {
                        popUps(true, `${obj.name} Logged in successfully!`);
                        delete obj.message;
                    }
                    setUserAuth({ ...userAuth, ...obj });
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                    modalToggle(false);
                })
                .catch(error => {
                    emptyModal();
                    popUps(false, String(error));
                });
        } else {
            if (modalObj.password !== modalObj.confirmPassword) {
                popUps(false, "Password and Confirm Password do not match");
                emptyModal(true);
                closeLoading();
                return;
            }

            fetch(SIGN_UP_URL, requestOptions)
                .then(response => response.json())
                .then(obj => {
                    emptyModal();
                    closeLoading();
                    if (obj.message === 'Bad request') {
                        popUps(false, obj.error?.details[0]?.message);
                        return;
                    }
                    popUps(true, obj.message + " Please Login");
                })
                .catch(error => {
                    emptyModal();
                    popUps(false, String(error));
                });
        }
    }

    const onChangeHandler = (e) => {
        setModalObj({
            ...modalObj,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className='signin-modal'>
                <div onClick={() => modalToggle(false)} className='modal-close-button'><RxCross1 /></div>
                <div className='login-header'>
                    <div className='login-header-left'>
                        <h1>{modalObj.isLogin ? "Login" : "Sign Up"}</h1>
                        <div className='login-header-new'>or <p onClick={() => emptyModal()} > {modalObj.isLogin ? "create an account" : "login to your account"}</p></div>
                        <div style={{ width: '70%', border: '2px solid rgba(0, 0, 0, 0.6)' }}></div>
                    </div>
                    <div className='login-img'>
                        <img src={loginImg} alt="loginImg" />
                    </div>
                </div>
                <form autoComplete="on" className='login-main' onSubmit={(e) => {
                    formSubmitHandler(e);
                }} method="post">
                    {
                        modalObj.isLogin ?
                            <>
                                <div className='inputBox'>
                                    <input autoComplete="email" type='text' name='email' value={modalObj.email} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Email</label>
                                </div>
                                <div className='inputBox'>
                                    <input autoComplete="current-password" type='password' name='password' value={modalObj.password} onChange={(e) => onChangeHandler(e)} required />
                                    <label>password</label>
                                </div>
                                <button className='login-button'>Login</button>
                            </>
                            : <>
                                <div className='inputBox'>
                                    <input autoComplete="name" type='text' name='name' value={modalObj.name} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Name</label>
                                </div>
                                <div className='inputBox'>
                                    <input autoComplete="email" type='text' name='email' value={modalObj.email} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Email</label>
                                </div>
                                <div className='inputBox'>
                                    <input autoComplete="new-password" type='password' name='password' value={modalObj.password} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Password</label>
                                </div>
                                <div className='inputBox'>
                                    <input autoComplete="new-password" type='password' name='confirmPassword' value={modalObj.confirmPassword} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Confirm Password</label>
                                </div>
                                <button className='login-button'>Sign Up</button>
                            </>
                    }
                    <div className='login-terms'>By {modalObj.isLogin ? "clicking on Login" : "creating an account"}, I accept the <span>Terms & Conditions</span> & <span>Privacy Policy</span></div>
                </form>
            </div>
        </>
    )
}

const HeaderComponent = () => {
    const [isActive, setIsActive] = useState(false);
    const [dropdown, setDropDown] = useState(false);
    const cartItems = useSelector(store => store.cart.items);
    const { userAuth, setUserAuth, modalObject, setModalObject } = useContext(UserAuth);
    const screenWidth = useScreenWidth();

    if (screenWidth > 768 && isActive) {
        setIsActive(false);
    }
    const modalToggle = (state) => {
        if (state) {
            setModalObject({ ...modalObject, modal: true });
            document.body.style.overflow = 'hidden';
        }
        else {
            setModalObject({ ...modalObject, modal: false });
            document.body.style.overflow = '';
        }
    }
    const toggleActive = () => {
        setIsActive(!isActive);
    }
    return (
        <>
            <ToastContainer theme="dark" draggable={false} transition={Zoom} autoClose={8000} />
            <div className="header">
                <Title />
                <ul className="header-links">
                    <li><Link to="/"><AiFillHome />Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {!userAuth.email ? <li onClick={() => {
                        modalToggle(true);
                    }}>Sign In</li> :
                        <div className='name-dropdown' style={{ position: 'relative' }} >
                            <div onClick={() => setDropDown(!dropdown)}
                                style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                {userAuth.name} {
                                    dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                            </div>
                            {
                                dropdown && <div className='dropdown-menu'>
                                    <Link onClick={() => setDropDown(false)} to={`profile/${userAuth.userId}`}><CgProfile /> My Profile</Link>
                                    <Link to='/' onClick={() => {
                                        localStorage.clear();
                                        setDropDown(false);
                                        for (let key in userAuth) {
                                            if (key !== 'modal') {
                                                userAuth[key] = '';
                                            }
                                        }
                                        setUserAuth({ ...userAuth });
                                    }}><RiLogoutBoxRLine /> Logout</Link>
                                </div>
                            }
                        </div>
                    }
                    <li><Link to="/cart" style={{ position: 'relative', fontSize: 25 }}><AiOutlineShoppingCart />
                        <div className='cart-length'>{cartItems.length > 0 && <span >{cartItems.length}</span>}</div></Link>
                    </li>
                </ul>
                {
                    screenWidth < 768 && <div className="nav-toggle" onClick={toggleActive} >
                        {
                            !isActive ? <BsList /> : <div className="close-popup">
                                <RxCross1 />
                            </div>
                        }
                    </div>
                }
            </div>
            {
                isActive && screenWidth < 768 && <ul className='nav-dropdown'>
                    <li onClick={toggleActive}><Link to="/">Home</Link></li>
                    <li onClick={toggleActive}><Link to="/about">About</Link></li>
                    <li onClick={toggleActive}><Link to="/contact">Contact</Link></li>
                    {!userAuth.email ? <li onClick={() => {
                        toggleActive();
                        modalToggle(true);
                    }}>Sign In</li> :
                        <div className='name-dropdown' style={{ position: 'relative' }} >
                            <div onClick={() => setDropDown(!dropdown)}
                                style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                {userAuth.name} {
                                    dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                            </div>
                            {
                                dropdown && <div className='dropdown-menu'>
                                    <Link onClick={() => { toggleActive(); setDropDown(false); }} to={`profile/${userAuth.userId}`}><CgProfile /> My Profile</Link>
                                    <Link to='/' onClick={() => {
                                        toggleActive();
                                        localStorage.clear();
                                        setDropDown(false);
                                        for (let key in userAuth) {
                                            if (key !== 'modal') {
                                                userAuth[key] = '';
                                            }
                                        }
                                        setUserAuth({ ...userAuth });
                                    }}><RiLogoutBoxRLine /> Logout</Link>
                                </div>
                            }
                        </div>
                    }
                    <li onClick={toggleActive}><Link to="/cart"><AiOutlineShoppingCart /></Link></li>
                </ul>
            }
        </>
    )
}

export default HeaderComponent;