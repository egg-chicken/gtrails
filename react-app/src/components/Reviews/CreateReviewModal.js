import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews';

function ReviewModal({id}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();
    const previousReview = useSelector((state) => state.review[id]);

    useEffect(() => {
        if (previousReview) {
          setErrors({ review: 'You already made a review for this spot! Only one review per spot' });
        } else {
          setErrors('');
        }
    }, [previousReview]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if (review && review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        setErrors(errors);

        if (Object.keys(errors).length === 0 && !previousReview) {
            const reviewData = {
              stars,
              review,
            };

            try {
              dispatch(reviewActions.createReview(id, reviewData)).then(() => {
                closeModal();
              });
            } catch (err) {
              setErrors({});
              console.error("Error creating review:", err);
            }
          }
    }

    return (
        <>
            <div>
                <h2>Review</h2>
                {errors && errors.review && <p className="error">{errors.review}</p>}
                {errors && errors.stars && <p className="error">{errors.stars}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        className='review-input'
                        value={review}
                        placeholder='Leave your review here . . .'
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className='star-rating-container'>
                        {[1, 2, 3, 4, 5].map((star, index) => {
                            index += 1
                            return (
                                <button
                                    type = 'button'
                                    key={index}
                                    id={`star-${index}`}
                                    className={index <= (hover || stars) ? 'star-button on' : 'star-button off'}
                                    onClick={() => setStars(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(index)}
                                >
                                    <span className='star-symbol'>&#9733;</span>
                                </button>
                            )
                        })}
                        <label htmlFor='star-ratings' className='star-name'>Stars</label>
                    </div>
                    <button type='submit'
                            onClick={handleSubmit}
                            disabled={review.length < 10 || stars === 0 || !!previousReview}
                    >
                        Submit Your Review
                    </button>
            </form>
          </div>
        </>
    )
}

export default ReviewModal;
