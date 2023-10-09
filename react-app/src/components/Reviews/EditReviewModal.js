import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import './css/create-edit-review.css';

function EditReviewModal({id}) {
    const dispatch = useDispatch();
    const reviewId = useSelector((state) => state.review[id]);

    const [review, setReview] = useState(reviewId?.review || '');
    const [stars, setStars] = useState(reviewId?.stars || 0);
    const [hover, setHover] = useState(0);

    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(reviewActions.getReviewsDetails(id))
            .then(reviewdetail => {
                if(reviewdetail){
                    setReview(reviewdetail.review)
                    setStars(reviewdetail.stars)
                }
            })
            .catch((err) => {
                console.error('Error fetching review details:', err);
            });
    },[dispatch, id]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if (review && review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
          } else {
            setErrors({});
            const formData = new FormData();
            formData.append("review", review);
            formData.append("stars", stars);

            dispatch(reviewActions.editReview(id, formData))
                .then(() => {
                    closeModal();
                })
                .catch((err) => {
                    setErrors(err)
                })
          }
    }

    return (
        <div className='create-review-container'>
            <div>
              <p className='review-title'>Edit your review</p>
            </div>
            <div className="error-message">{errors && errors.review && <p className="error-message">{errors.review}</p>}</div>
            <div className="error-message">{errors && errors.stars && <p className="error-message">{errors.stars}</p>}</div>
            <form onSubmit={handleSubmit}>
                <div className='star-rating-container'>
                    <p className='rating-text'>Rating</p>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type = 'button'
                                key={index}
                                id={`star-${index}`}
                                className={`star-button ${index <= (hover || stars) ? 'on' : 'off'}`}
                                onClick={() => setStars(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(stars)}
                            >
                                <i className="fa fa-solid fa-star" />
                            </button>
                        )
                    })}
                </div>
                <div className='review-rating-container'>
                    <p className='rating-text'>Review</p>
                    <input
                        className='review-input'
                        value={review}
                        placeholder='Update your review here . . .'
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className='review-submit-button-placement'>
                    <button type='submit'
                            onClick={handleSubmit}
                            className='review-submit-button'
                            disabled={review.length < 10 || stars === 0}
                    >
                        <p className='post-text'>Update Your Review</p>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditReviewModal;
