import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import DeleteModal from './DeleteSpotModal';
// import OpenModalButton from '../OpenModalButton';
import * as reviewActions from '../../store/reviews';

const ManageReviewsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector((state) => state.review);
    const reviewArray = Object.values(reviews);

    useEffect(() => {
        dispatch(reviewActions.getCurrentUsersReviews())
    }, [dispatch]);

    console.log('reviewArray',reviewArray)
    console.log('reviews', reviews)

    return (
        <>
            <h1>Manage Reviews</h1>
    
            {reviewArray.map((review) => (
                <div key={review.id}>
                    <Link to={`/reviews/${review.id}`}>
                    <p>{review.review}</p>
                    <p>{review.stars}</p>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default ManageReviewsPage;
