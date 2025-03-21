import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>
                Choose from a doverse menu featuring a delectable array of dishes 
                Our mission is to satisfy you cravings and elevate your
                dining experienc, one delicious meal at a time.
            </p>
            <div className='explore-menu-list'>
                {
                    menu_list.map((item, index) => {
                        return(
                            <div className='explore-menu-list-item' key={index}
                                onClick={() => setCategory((prev) => prev === item.menu_name ? "All" : item.menu_name)} 
                            >
                                <img src={item.menu_image} alt="menu-image" 
                                className={category === item.menu_name ? "active" : ''}/>
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu