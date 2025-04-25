import React from 'react';
import './RatingModal.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingModal = ({ isOpen, onClose, onSubmit, currentRating, setCurrentRating, isSubmitting }) => {
    if (!isOpen) return null;

    return (
        <div className="rating-modal-overlay">
            <div className="rating-modal">
                <h3>Rate this dish</h3>
                <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) =>
                        star <= currentRating ? (
                            <FaStar
                                key={star}
                                onClick={() => setCurrentRating(star)}
                                className="star filled"
                            />
                        ) : (
                            <FaRegStar
                                key={star}
                                onClick={() => setCurrentRating(star)}
                                className="star empty"
                            />
                        )
                    )}
                </div>
                <button className='rating-submit' onClick={onSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Rating"}
                </button>
                <button className='rating-close' onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default RatingModal;
