import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import RatingModal from '../RatingModal/RatingModal'


const FoodItem = ({ id, name, price, description, image, averageRating }) => {
    // const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);

    // const handleRating = (newRating) => {
    //     // Handle rating logic here (you can call an API to submit the rating if needed)
    //     setRating(newRating);
    // };

    // Function to generate stars based on rating


    // Open rating modal only if logged in
    const openModal = () => {
        if (!token) {
            toast.info("Please log in to rate.");
        } else {
            setShowRatingModal(true);
        }
    };

    // GET USER ID FROM THE TKEN
    const getUserIdFromToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedData = JSON.parse(atob(base64));
            return decodedData.id;
        } catch (error) {
            console.error("Invalid token");
            return null;
        }
    };

    // Submit rating
    const handleSubmitRating = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${url}/api/ratings/add`,
                {
                    foodId: id,
                    userId: getUserIdFromToken(token),
                    rating: rating
                },
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success("Thanks for your rating!");
            } else {
                toast.error("Failed to submit rating.");
            }
        } catch (error) {
            toast.error("Error submitting rating.");
        }
        setIsSubmitting(false);
        setShowRatingModal(false);
    };

    useEffect(() => {
        if (averageRating) {
            setRating(Number(averageRating));
        }
    }, [averageRating]);

    return (
        <div className='food-item'>
            <div className="foot-item-image-container">
                <img className="food-item-image" src={url + "/images/" + image} alt="foodItemImage" />
                {/* <img className="food-item-image" src={image} alt="foodItemImage" /> */}
                {
                    !cartItems[id]
                        ? <img
                            className='add'
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white} alt='AddIconWhite'
                        />
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    {/* <img src={assets.rating_starts} alt="" /> */}
                    <div className='rating-star-container'>
                        <div className="rating-stars" onClick={openModal}>
                            {[1, 2, 3, 4, 5].map((i) =>
                                i <= rating ? (
                                    <FaStar key={i} className="star filled" />
                                ) : (
                                    <FaRegStar key={i} className="star empty" />
                                )
                            )}
                        </div>
                        <span className='rating-number'>{averageRating}</span>
                    </div>
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">₹{price}</p>
            </div>

            <RatingModal
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                onSubmit={handleSubmitRating}
                currentRating={rating}
                setCurrentRating={setRating}
                isSubmitting={isSubmitting}
            />

        </div>
    )
}

export default FoodItem
