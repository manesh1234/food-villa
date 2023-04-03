import { useState, useContext } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/logo.png";
import loginImg from "../assets/login-img.png";
import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineShoppingCart, AiFillHome, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import UserAuth from '../utils/UserAuth';
import { SIGN_IN_URL } from '../utils/constants';


const Title = () => {
    return (
        <Link to="/" >
            <div className="header-logo">
                <h1><pre>Food Villa</pre></h1>
                <div className="header-logo-img">
                    <img src={logo} alt="logo"></img>
                </div>
            </div>
        </Link>
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
    const emptyModal = (modalToggle) => {
        for (let key in modalObj) {
            if (key !== 'isLogin') {
                modalObj[key] = '';
            }
        }
        if (modalToggle) modalObj.isLogin = !modalObj.isLogin;
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
        console.log(modalObj);
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", modalObj.email);
        urlencoded.append("password", modalObj.password);
        var requestOptions = {
            method: 'POST',
            body: urlencoded,
        };
        if (modalObj.isLogin) {
            fetch(SIGN_IN_URL, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const obj = JSON.parse(result);
                    closeLoading();
                    if (obj.message === 'Password is incorrect' || obj.message === 'User does not exist with this email') {
                        popUps(false, obj.message);
                        emptyModal();
                        return;
                    }
                    obj.message = obj.message.slice(5);
                    popUps(true, `${obj.name} ${obj.message}`);
                    delete obj.message;
                    setUserAuth({ ...userAuth, ...obj });
                    localStorage.setItem('userInfo', JSON.stringify(obj));
                    modalToggle(false);
                })
                .catch(error => {
                    emptyModal();
                    popUps(false, error);
                });
        }
        else {
            urlencoded.append("name", modalObj.name);
            fetch("https://restaurants-api-9zvz.onrender.com/signup", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const obj = JSON.parse(result);
                    emptyModal();
                    closeLoading();
                    if(obj.message === 'User already exists with this email'){
                        popUps(false,obj.message);
                        return;
                    }
                    console.log(obj);
                })
                .catch(error => console.log('error', error));
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
                        <div className='login-header-new'>or <p onClick={() => emptyModal(true)} > {modalObj.isLogin ? "create an account" : "login to your account"}</p></div>
                        <div style={{ width: '70%', border: '2px solid rgba(0, 0, 0, 0.6)' }}></div>
                    </div>
                    <div className='login-img'>
                        <img src={loginImg} alt="loginImg" />
                    </div>
                </div>
                <form className='login-main' onSubmit={(e) => {
                    formSubmitHandler(e);
                    setModalObject({ ...modalObject, loading: true });
                }} method="post">
                    {
                        modalObj.isLogin ?
                            <>
                                <div className='inputBox'>
                                    <input type='text' name='email' value={modalObj.email} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Email</label>
                                </div>
                                <div className='inputBox'>
                                    <input type='password' name='password' value={modalObj.password} onChange={(e) => onChangeHandler(e)} required />
                                    <label>password</label>
                                </div>
                                <button className='login-button'>Login</button>
                            </>
                            : <>
                                <div className='inputBox'>
                                    <input type='text' name='name' value={modalObj.name} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Name</label>
                                </div>
                                <div className='inputBox'>
                                    <input type='text' name='email' value={modalObj.email} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Email</label>
                                </div>
                                <div className='inputBox'>
                                    <input type='password' name='password' value={modalObj.password} onChange={(e) => onChangeHandler(e)} required />
                                    <label>Password</label>
                                </div>
                                <div className='inputBox'>
                                    <input type='password' name='confirmPassword' value={modalObj.confirmPassword} onChange={(e) => onChangeHandler(e)} required />
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
    const [isActive, setIsActive] = useState(true);
    const [dropdown, setDropDown] = useState(false);
    const cartItems = useSelector(store => store.cart.items);
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
    return (
        <>
            <ToastContainer theme="dark" draggable={false} transition={Zoom} autoClose={8000} />
            <div className="header">
                <Title />
                <ul className="header-links">
                    <li><Link to="/"><AiFillHome />Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {!userAuth.email ? <li onClick={() => {
                        modalToggle(true);
                    }}>Sign In</li> : <div className='name-dropdown' style={{ position: 'relative' }} > <div onClick={() => setDropDown(!dropdown)} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>{userAuth.name} {dropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
                        {
                            dropdown && <div className='dropdown-menu'>
                                <Link to='profile'><CgProfile /> My Profile</Link>
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
                <div className="nav-toggle" onClick={() => setIsActive(!isActive)} >
                    {
                        isActive ? <BsList /> : <RxCross1 />
                    }
                </div>
            </div>
            <ul className={`${isActive ? 'none' : 'nav-dropdown'}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li>Cart</li>
            </ul>
        </>
    )
}

export default HeaderComponent;