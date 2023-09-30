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

    // console.log('reviews', reviews)
    // console.log('reviewsArray', reviewArray)

    useEffect(() => {
        dispatch(reviewActions.getCurrentUsersReviews())
    }, [dispatch]);


    return (
        <div className='manage-review-container'>
            <h1>Manage Reviews</h1>
            <div>

            </div>
            <div className='all-user-reviews'>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.stars}</p>
                        <p>{review.spotName}</p>
                        <p>{review.review}</p>
                        <OpenModalButton
                        modalComponent={<DeleteReviewModal id={review.id}/>}
                        buttonText='Delete'
                        />
                        <OpenModalButton
                            modalComponent={<EditReviewModal id={review.id}/>}
                            buttonText='Edit'
                        />
                    </div>
                ))}
            </div>
            <div>

            </div>

        </div>
    )
}

export default ManageReviewsPage;
