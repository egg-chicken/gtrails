import React, { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/reviews';
import './css/create-edit-review.css';

function ReviewModal({id}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const location = useSelector((state) => state.location[id]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors(null);

        const submitErrors = {};

        if (review.length < 5) submitErrors.review = 'Please enter a comment with at least 5 characters.';
        if (stars === 0 ) submitErrors.stars = 'Select a rating';
        if (submitErrors.review || submitErrors.stars) {
          setErrors(submitErrors);
          return
        }

        if (!errors) {

          const reviewData = {
              stars,
              review,
            };

            const data = await dispatch(reviewActions.createReview(id, reviewData))

            if(data){
              setErrors(data);
            } else {
              closeModal();
            }

          }
    }

    return (
        <div className='create-review-container'>
            <div>
            {/* <p className='review-title'>Create Review</p> */}
            <p className='review-title'>{location.name}</p>
            </div>
              <div>{errors && errors.message && <p className="error">{errors.message}</p>}</div>
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
                    <button type='submit' onClick={handleSubmit} className='review-submit-button'>
                        <p className='post-text'>Post</p>
                    </button>
                  </div>
          </form>
        </div>
    )
}

export default ReviewModal;
