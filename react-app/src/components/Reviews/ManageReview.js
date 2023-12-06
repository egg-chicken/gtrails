import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import * as locationActions from '../../store/locations';
import * as reviewActions from '../../store/reviews';
import './css/manage-review.css';

const ManageReviewsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.review));
    // const location = useSelector((state) => state.location[id]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        dispatch(reviewActions.getCurrentUsersReviews())
        dispatch(locationActions.getLocations())
    }, [dispatch, id]);

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
            <div className='location-border-card'>
            <p className='review-title manage-review'>Manage Reviews</p>
            <div className='all-user-reviews'>
                {reviews?.map(review => {
                    const reviewMonth = months[new Date(review.createdAt).getMonth()];
                    const day = (new Date(review.createdAt).getDate()) + 1;
                    const year = new Date(review.createdAt).getFullYear();

                    return (
                        <div className='each-review' key={review.id}>
                            <div className='review-detials'>
                                    <div className='each-review-info'>
                                        <Link className='review-link-location' to={`/locations/${review.locationId}`}>
                                            <img className='review-img' src={review.image} alt={review.image}/>
                                        </Link>
                                        <div className='username-date'>
                                            <Link className='review-link-location' to={`/locations/${review.locationId}`}>
                                                <p className='review-location-name'>{review.locationName}</p>
                                            </Link>
                                            <p className='date'>{reviewMonth} {day}, {year}</p>
                                        </div>
                                    </div>
                                    <div className='star-rating'>
                                        {[...Array(review.stars)].map((star, index) => (
                                        <i key={index} className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                                        ))}
                                    </div>
                                    <p className='review-text'>{review.review}</p>
                            </div>

                            <OpenModalButton
                                modalComponent={<DeleteReviewModal id={review.id}/>}
                                buttonText='Delete'
                                buttonType="Delete"
                            />&#124;
                            <OpenModalButton
                                modalComponent={<EditReviewModal id={review.id}/>}
                                buttonText='Edit'
                                buttonType="edit"
                            />
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

export default ManageReviewsPage;
