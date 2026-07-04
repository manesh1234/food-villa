
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <section className="contact-page">
            <div className="contact-hero">
                <div className="hero-glow"></div>
                <div className="hero-copy">
                    <span className="hero-label">Food Villa Support</span>
                    <h1>Send us a wild message and we’ll cook up something magical.</h1>
                    <p>Whether you need help with orders, partnerships, feedback, or just want to say hello — our kitchen is open and the team is listening.</p>
                </div>
                <div className="hero-badges">
                    <div className="badge badge-fire">
                        <span>24/7</span>
                        <p>Lightning support</p>
                    </div>
                    <div className="badge badge-spice">
                        <span>600+</span>
                        <p>Happy meals delivered weekly</p>
                    </div>
                    <div className="badge badge-deluxe">
                        <span>4.9★</span>
                        <p>Average flavor rating</p>
                    </div>
                </div>
            </div>

            <div className="contact-grid">
                <aside className="contact-panel">
                    <div className="panel-flag">Let's talk</div>
                    <h2>Need a custom order or restaurant help?</h2>
                    <p>We are ready to answer your question, celebrate your event, or solve your delivery problem with a splash of flavor.</p>

                    <div className="panel-list">
                        <div className="panel-item">
                            <FaMapMarkerAlt className="panel-icon" />
                            <div>
                                <strong>Office</strong>
                                <span>Financial District, Hyderabad</span>
                            </div>
                        </div>
                        <div className="panel-item">
                            <FaPhoneAlt className="panel-icon" />
                            <div>
                                <strong>Phone</strong>
                                <span>+91 63044 09399</span>
                            </div>
                        </div>
                        <div className="panel-item">
                            <FaEnvelope className="panel-icon" />
                            <div>
                                <strong>Email</strong>
                                <span>support@foodvilla.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="panel-socials">
                        <a href="https://www.linkedin.com/in/manesh-ram/" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        <a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://twitter.com/" aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </aside>

                <article className="contact-card">
                    <div className="contact-card-title">
                        <span>Drop a note</span>
                        <h2>We answer fast — usually before your food arrives.</h2>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="field-row">
                            <label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                <span>Name</span>
                            </label>
                            <label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                <span>Email</span>
                            </label>
                        </div>
                        <label className="full-width">
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                            <span>Subject</span>
                        </label>
                        <label className="full-width textarea-label">
                            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required />
                            <span>Message</span>
                        </label>
                        <button type="submit" className="contact-submit">
                            <FaPaperPlane /> Send message
                        </button>
                        {status === 'sent' && <div className="contact-status">Message delivered! We’ll reply soon.</div>}
                    </form>
                </article>
            </div>

            <div className="contact-footer">
                <div className="footer-card footer-highlight">
                    <h3>Phone support in 15 minutes</h3>
                    <p>Call our team anytime and get help for orders, menus, or business requests.</p>
                </div>
                <div className="footer-card footer-map">
                    <div className="map-overlay">
                        <span>Live kitchen view</span>
                        <p>We’re always cooking and ready to serve you.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;     