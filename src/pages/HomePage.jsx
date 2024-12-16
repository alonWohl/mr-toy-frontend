import { Link } from 'react-router-dom'
import logo from '../assets/img/geoffrey-pose.avif'

export function HomePage() {
	return (
		<section className="home-page">
			<div className="hero-section">
				<img src={logo} alt="Geoffrey the Giraffe" className="hero-image" />
				<div className="hero-content">
					<h1>Welcome to MrToy</h1>
					<p>Discover a world of joy and imagination</p>
					<Link to="/toy" className="shop-now-btn">
						Shop Now
					</Link>
				</div>
			</div>

			<div className="features-section">
				<div className="feature-card">
					<span className="icon">🚚</span>
					<h3>Free Shipping</h3>
					<p>On orders over $50</p>
				</div>
				<div className="feature-card">
					<span className="icon">⭐</span>
					<h3>Top Brands</h3>
					<p>Quality you can trust</p>
				</div>
				<div className="feature-card">
					<span className="icon">🎁</span>
					<h3>Gift Ready</h3>
					<p>Perfect for any occasion</p>
				</div>
			</div>
		</section>
	)
}
