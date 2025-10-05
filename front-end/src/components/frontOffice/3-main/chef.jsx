import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./chef.css";

const ChefSection = () => {
  return (
    <section className="chef-section">
      <div className="chef-container">
        <div className="chef-text">
          <h2 className="chef-title">Our Expert Chefs</h2>
          <p className="chef-subtitle">
            Our talented culinary team brings years of experience and passion to 
            every dish they create. Using only the freshest ingredients, they craft 
            memorable meals that keep our customers coming back for more.
          </p>

          {/* Features */}
          <div className="chef-features">
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>10+ years of culinary experience</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>Locally sourced ingredients</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>Creative menu development</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>Hygiene and safety certified</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>Special dietary accommodations</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="icon" />
              <span>Seasonal menu rotations</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="chef-buttons">
            <button className="btn btn-dark">View Menu</button>
            <button className="btn btn-orange">Book a Table</button>
           
          </div>
        </div>

        {/* Image section */}
        <div className="chef-image-wrapper">
          <div className="circle-bg"></div>
          <div className="chef-image-container">
            <img
              src="chef.png"
              alt="Professional Chef"
              className="chef-image"
            />
          </div>
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>
    </section>
  );
};

export default ChefSection;