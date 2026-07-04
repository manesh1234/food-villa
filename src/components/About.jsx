import { FaPizzaSlice, FaTruck, FaCity, FaUsers, FaUtensils, FaStar } from "react-icons/fa";

const About = () => {
    return (
        <section className="about-page">
            <header className="about-hero">
                <div className="about-hero-copy">
                    <span className="about-eyebrow">About Food Villa</span>
                    <h1>We turned restaurant food delivery into a flavor-first celebration.</h1>
                    <p>Food Villa is built for people who want fast delivery, unforgettable menus, and a service experience that feels as warm as home. Our kitchen brings together local favorites, newest food trends, and joyful everyday moments.</p>
                </div>
                <div className="about-hero-highlights">
                    <div className="hero-card hero-card--love">
                        <FaCity />
                        <strong>9k+ locations</strong>
                        <p>Beloved by customers for taste and service.</p>
                    </div>
                    <div className="hero-card hero-card--bright">
                        <FaPizzaSlice />
                        <strong>10k+ menus</strong>
                        <p>Delicious restaurant menus for every craving.</p>
                    </div>
                    <div className="hero-card hero-card--fast">
                        <FaTruck />
                        <strong>30 min</strong>
                        <p>Hot food delivered fast with every order.</p>
                    </div>
                </div>
            </header>

            <div className="about-grid">
                <article className="about-card about-story">
                    <div className="card-head">
                        <span>Our mission</span>
                        <h2>Fresh food, faster delivery, and memorable dining moments.</h2>
                    </div>
                    <p>What started as a single kitchen with a bold dream is now a community of food lovers, local restaurant partners, and delivery teams who care about every meal. We believe every order should feel like a thoughtful treat.</p>
                    <div className="story-points">
                        <div className="story-point">
                            <FaUsers />
                            <div>
                                <strong>People first</strong>
                                <p>We support local chefs and serve every guest with care.</p>
                            </div>
                        </div>
                        <div className="story-point">
                            <FaUtensils />
                            <div>
                                <strong>Quality always</strong>
                                <p>Fresh ingredients and crafted menus are our standard.</p>
                            </div>
                        </div>
                        <div className="story-point">
                            <FaStar />
                            <div>
                                <strong>Trusted service</strong>
                                <p>Fast delivery and consistent delight, every time.</p>
                            </div>
                        </div>
                    </div>
                </article>
                <article className="about-card about-timeline">
                    <div className="card-head">
                        <span>Our journey</span>
                        <h2>From a humble kitchen to a city-wide food movement.</h2>
                    </div>
                    <div className="timeline">
                        <div className="timeline-step">
                            <strong>2024</strong>
                            <p>Food Villa launches with one delivery van and one menu.</p>
                        </div>
                        <div className="timeline-step">
                            <strong>2025</strong>
                            <p>Expanded into six neighborhoods and introduced evening specials.</p>
                        </div>
                        <div className="timeline-step">
                            <strong>2026</strong>
                            <p>Now serving customers across cities with a fresh mobile experience.</p>
                        </div>
                    </div>
                </article>
            </div>

            <section className="about-team">
                <div className="section-head">
                    <span>Meet the team</span>
                    <h2>Passionate Founder behind every delivery.</h2>
                </div>
                <div className="team-grid">
                    <div className="team-card">
                        <h3>Manish Ram</h3>
                        <p>Founder & CEO</p>
                        <p>Created Food Villa around speed, flavor, and joyful food moments.</p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default About;