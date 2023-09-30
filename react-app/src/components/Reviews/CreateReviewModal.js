import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import './css/create-edit-review.css';

function ReviewModal({id, setIsVisible, spotId}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();
    const spot = useSelector((state) => state.spot[id]);
    const previousReview = useSelector((state) => state.review[id]);

    console.log('bruhhh', previousReview)
    console.log('spottt', spot)

    // useEffect(() => {
    //   console.log('Previous review:', previousReview);
    //     if (previousReview) {
    //       setErrors({ review: 'You already made a review for this spot! Only one review per spot' });
    //     } else {
    //       setErrors('');
    //     }
    // }, [previousReview]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if (review.length < 10) errors.review = 'Please enter a comment with at least 10 characters.';
        if (stars === 0 ) errors.stars = 'Select a rating';

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const reviewData = {
              stars,
              review,
            };
          // const reviewData = {
            //   stars,
            //   review,
            // };

            try {
              dispatch(reviewActions.createReview(id, reviewData)).then(() => {
                closeModal();
                // setIsVisible(false);
              });
            } catch (err) {
              setErrors({});
              console.error("Error creating review:", err);
            }
          }
    }

    return (
        <div className='create-review-container'>
            <div>
            <p className='review-title'>Update Review</p>
              {/* <p className='review-title'>{spot.name}</p> */}
            </div>
              <div>{errors && errors.review && <p className="error">{errors.review}</p>}</div>
              <div>{errors && errors.stars && <p className="error">{errors.stars}</p>}</div>
              <form onSubmit={handleSubmit}>
                  <div className='star-rating-container'>
                    <p className='rating-text'>Rating</p>
                      {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                              <button
                                  type='button'
                                  key={index}
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
                        placeholder='Share your thoughts!'
                        onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <div className='review-submit-button-placement'>
                    <button type='submit'
                        onClick={handleSubmit}
                        className='review-submit-button'
                        // disabled={review.length < 10 || stars === 0 || !!previousReview}
                    >
                        <p className='post-text'>Post</p>
                    </button>
                  </div>
          </form>
        </div>
    )
}

export default ReviewModal;
