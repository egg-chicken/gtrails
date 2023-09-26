import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews';

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
        <>
            <div>
                <h2>Edit Review</h2>
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
                            // disabled={review.length < 10 || stars === 0}
                    >
                        Update Your Review
                    </button>
            </form>
          </div>
        </>
    )
}

export default EditReviewModal;
