import { GoogleMaps } from '../cmps/GoogleMaps'

export function AboutUs() {
	return (
		<section className="about-us">
			<div className="about-content">
				<div className="about-text">
					<h2>Welcome to Our Store</h2>
					<p>
						Since our establishment, we've been committed to providing exceptional service and quality products to our valued customers. Our journey began with a simple vision: to create a shopping experience that combines convenience with
						excellence.
					</p>
					<p>With two prime locations in the heart of the city, we're proud to serve our community with a wide range of products and personalized service that sets us apart from the competition.</p>

					<div className="contact-info">
						<div className="contact-item">
							<h3>Branch 1</h3>
							<p>123 Main Street</p>
							<p>Tel: (123) 456-7890</p>
							<p>Hours: 9AM - 9PM</p>
						</div>

						<div className="contact-item">
							<h3>Branch 2</h3>
							<p>456 Market Avenue</p>
							<p>Tel: (123) 456-7891</p>
							<p>Hours: 9AM - 9PM</p>
						</div>

						<div className="contact-item">
							<h3>Customer Service</h3>
							<p>Email: support@store.com</p>
							<p>Tel: (123) 456-7892</p>
							<p>Hours: 24/7</p>
						</div>
					</div>
				</div>

				<div className="map-section">
					<GoogleMaps />
				</div>
			</div>
		</section>
	)
}
