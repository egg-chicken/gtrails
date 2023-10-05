import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import * as reviewActions from '../../store/reviews';
import './css/manage-review.css';

const ManageReviewsPage = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.review));

    useEffect(() => {
        dispatch(reviewActions.getCurrentUsersReviews())
    }, [dispatch]);

    if (reviews.length === 0) {
        return (
            <div className='manage-review-container'>
                <h1>Manage Reviews</h1>
                <p>No reviews available. Find a location and create a review</p>
            </div>
        );
    }

    return (
        <div className='manage-review-container'>
            <h1>Manage Reviews</h1>

            <div className='all-user-reviews'>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <div className='review-detials'>
                            <div className='star-rating'>
                                {[...Array(review.stars)].map((star, index) => (
                                <i key={index} className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                                ))}
                            </div>
                                <p>{review.locationName}</p>
                                <p>{review.review}</p>
                        </div>

                        <OpenModalButton
                            modalComponent={<DeleteReviewModal id={review.id}/>}
                            buttonText='Delete'
                            buttonType="Delete"
                        />
                        <OpenModalButton
                            modalComponent={<EditReviewModal id={review.id}/>}
                            buttonText='Edit'
                            buttonType="edit"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ManageReviewsPage;
