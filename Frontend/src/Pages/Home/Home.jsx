import React, { useState } from 'react'
import './Home.css';
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/EploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import AboutUs from '../../Components/AboutUs/AboutUs';


const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AboutUs />
    </div>
  )
}

export default Home