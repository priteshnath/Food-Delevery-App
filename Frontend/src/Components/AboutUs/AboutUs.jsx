import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-section" id='About'>
      <div className="about-us-container">
        <h1 className="about-title">About <span>Foodzy</span></h1>
        <p className="about-text">
          Welcome to <strong>Foodzy</strong>, your go-to destination for delicious meals delivered right to your doorstep.
          We are a bold and innovative food delivery brand dedicated to bringing you the freshest and tastiest dishes
          straight from our exclusive cloud kitchen.
        </p>
        <p className="about-text">
          At <strong>Foodzy</strong>, every meal is prepared with love and care using only the finest ingredients. Whether
          you're craving comfort food, healthy bites, or want to try something new — we’ve got your cravings covered.
        </p>

        <h2 className="vision-title">Our Vision</h2>
        <p className="about-text">
          Our mission is simple — to offer a delightful food journey from order to doorstep. We go beyond just meals.
          We serve experiences.
        </p>

        <h2 className="difference-title">What Makes Us Different?</h2>
        <ul className="about-list">
          <li>🍽️ Fresh, chef-crafted meals daily</li>
          <li>🌿 Health-conscious and tasty options</li>
          <li>🧑‍🍳 100% made in our own cloud kitchen</li>
        </ul>
      </div>
    </section>

  );
};

export default AboutUs;
