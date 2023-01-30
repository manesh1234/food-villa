import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { MdOutlineSort } from 'react-icons/md';

const Title = () => {
    return (
        <Link to="/" >
            <div className="header-logo">
                <h1><pre>Food Villa</pre></h1>
                <img src={logo} alt="logo"></img>
            </div>
        </Link>
    )
}

const HeaderComponent = (
    <div className="header">
        <Title />
        <ul className="header-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>Cart</li>
        </ul>
        <MdOutlineSort className="nav-toggle" />
    </div>
)

export default HeaderComponent;