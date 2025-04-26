import React, { useContext, useEffect, useState } from 'react';
import './SearchFoodItems.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../Components/FoodItem/FoodItem';

const SearchFoodItems = () => {
    const { searchQuery, searchResults, food_list, clearSearch } = useContext(StoreContext);
    const [showAll, setShowAll] = useState(false);
    console.log(searchQuery, searchResults, food_list);

    const displayedItems = showAll ? food_list : searchResults;

    const handleClearFilter = () => {
        clearSearch();
        setShowAll(true);
    };
    useEffect(() => {
        setShowAll(false);
    }, [searchQuery, searchResults, showAll]);

    return (
        <div className="food-display" id="search-results">
            <h2>Search Results</h2>

            {/* Filter section always visible */}
            <div className="search-filter">
                {
                    showAll || !searchQuery
                        ? <p>Showing <b>all items</b></p>
                        : <p>Showing results for: <b>{searchQuery}</b></p>
                }
                {!(showAll || !searchQuery) && (
                    <button onClick={handleClearFilter}>Clear Filter</button>
                )}
            </div>

            <div className="food-display-list">
                {
                    displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                averageRating={item.averageRating}
                            />
                        ))
                    ) : (
                        <p>No items found matching <b>{searchQuery}</b>.</p>
                    )
                }
            </div>
        </div>
    );
};

export default SearchFoodItems;
