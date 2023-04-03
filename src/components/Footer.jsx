import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="left">
                <Link to="/">
                    <h2 className="logo">Food Villa</h2>
                </Link>
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <p> {new Date().getFullYear()} FoodVilla &copy; All right reserved</p>
            </div>
            <div className="middle">
                <p> <FiMapPin /> Banglore, Karnataka, India</p>
                <p> <FiPhone /> +91 6304409399</p>
                <p> <FiMail /> maneshram20@gmail.com </p>
            </div>
            <div className="right">
                <h3>About</h3>
                <p>an E-commerce website based on Food Ordering providing real time local restaurants data !</p>
                <div className="social">
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram /></a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer"><FaTwitter /></a>
                    <a href="https://www.linkedin.com/in/manesh-ram/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    <a href="tel:+91 6304409399"><FiPhone /></a>
                    <a href="mailto:maneshram@gmail.com"><FiMail /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
