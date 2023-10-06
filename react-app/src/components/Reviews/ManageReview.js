import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import * as reviewActions from '../../store/reviews';
import * as locationActions from '../../store/locations';
import { useParams } from 'react-router-dom';
import './css/manage-review.css';

const ManageReviewsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.review));
    const locations = useSelector((state) => state.location[id]);
    const locationsArray = locations ? Object.values(locations): [];

    //get locations details by id - if the locationId === the id of the location then return the image if not return previmage
    console.log('locationsxccc', locationsArray)

    useEffect(() => {
        dispatch(reviewActions.getCurrentUsersReviews())
        dispatch(locationActions.getLocationsDetails(id))
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
                {reviews.map((review) => (
                    <div key={review.id}>
                        <div className='review-detials'>
                            <div className='star-rating'>
                                {[...Array(review.stars)].map((star, index) => (
                                <i key={index} className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                                ))}
                            </div>
                            <div className='profile-location'>

                            </div>
                                <Link to={`/locations/${review.locationId}`}>
                                    <p>{review.locationName}</p>
                                    {/* {locations[review.locationId] && locations[review.locationId].image ? (
        <img src={locations[review.locationId].image} alt='location prev' className='image' title={locations[review.locationId].name} />
    ) : (
        <div className='image-placeholder'>Image not available</div>
    )} */}
                                </Link>
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
        </div>
    )
}

export default ManageReviewsPage;
