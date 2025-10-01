import './about.css'
import { Link } from "react-router-dom";

import { ChefHat, Coffee, Users } from 'lucide-react';
const About=()=>{
 

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-images">
              <div className="image-card large">
                <img src="./about1.webp" alt="Fresh tacos" />
              </div>
              <div className="image-column">
                <div className="image-card">
                  <img src="./about4.jpg" alt="Plated dish" />
                </div>
                <div className="image-card">
                  <img src="./about5.jpg" alt="Healthy salad" />
                </div>
              </div>
            </div>
            
            <div className="hero-content">
              <p className="about-label">about us</p>
              <h1 className="hero-title">Fast food is a convenient part of modern eating habits.</h1>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.
              </p>
              <Link to='/Menu'><button className="cta-button">See menu</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose us</h2>
            <p className="section-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum.
            </p>
          </div>

          <div className="food-image">
            <img src="./about6.jpg" alt="Delicious food spread" />
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <ChefHat size={48} />
              </div>
              <h3 className="feature-title">Best Chef</h3>
              <p className="feature-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Coffee size={48} />
              </div>
              <h3 className="feature-title">120 Item food</h3>
              <p className="feature-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={48} />
              </div>
              <h3 className="feature-title">Clean Environment</h3>
              <p className="feature-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header light">
            <h2 className="section-title">Team Member</h2>
            <p className="section-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue
            </p>
          </div>

          <div className="team-grid">
            {['Khalil Maalej', 'Ahmed karoui', 'Amin Chrigui', 'Sami trabelsi'].map((name, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1577219491135-ce391730fb2c' : '1595152772835-219674b2a8a6'}?w=300&h=400&fit=crop&face=1`} alt={name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{name}</h3>
                  <p className="team-role">{['Owner', 'Chef', 'Founder', 'Specialist'][index]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;