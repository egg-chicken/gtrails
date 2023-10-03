import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as locationActions from '../../store/locations';
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import EditReviewModal from '../Reviews/EditReviewModal';
import ReviewModal from '../Reviews/CreateReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import './css/location-detail.css'

const LocationDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location[id]);
    const reviews = useSelector((state) => Object.values(state.review));
    const user = useSelector(state => state.session.user);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    console.log('reviews', reviews)
    useEffect(() => {
        dispatch(locationActions.getLocationsDetails(id))
            .then(() => setIsLoaded(true))
        dispatch(reviewActions.getAllReviews(id))
            .then(() => setIsReviewsLoaded(true))
    }, [dispatch, id])

    useEffect(() => {

        if(isReviewsLoaded && isLoaded) {
          if(user){
              setIsVisible(true);
            }
          }

      },[isReviewsLoaded, isLoaded, user])

    const handleClick = e => {
      e.preventDefault();
      alert("Feature Coming Soon!")
    }

    if(!location){
        return 'no location'
    }

    return (
        <div className='location-detail-container'>
          <div className='location-border-card'>
            <div className='cover-container'>
              <img className='location-image-id' src={location.image} alt={location.image}/>
              <p className='location-detail-title'>{location.name}</p>
            </div>
            <div>{location.city}, {location.state}</div>
            <p className='location-rating'>
                <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'New'} ({reviews.length})
            </p>
            <div className='location-details-bar'>
              <p>Length: {location.length}</p>
              <p>Elevation Gain: {location.elevGain}</p>
              <p>Route Type: {location.routeType}</p>
            </div>
            <p>Check out this {location.length} mile {location.routeType} near {location.city}, {location.state}.</p>
            <p>Description</p>
            <div className='desc-box'>
              <p>{location.description}</p>
            </div>

            <p>Reviews ({reviews.length})</p>
            <div className='rev-box'>
            {isReviewsLoaded &&
            <div>
                <div className='location-details-bar'>
                  <div className='location-rating'>
                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                    {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'No Reviews, yet'}
                  </div>
                  <p>{reviews.length} reviews</p>

                  <div className='write-review-button-placement'>
                    {isVisible &&
                  <OpenModalButton
                      modalComponent={<ReviewModal id={location.id} />}
                      buttonText="Write a Review"
                      buttonType="add"
                  />}
                  </div>
                </div>
                <div className='s-review-box'>
                {(reviews.length < 1 && isVisible) && <div className='no-review-text'>Share your thoughts and post a review. Let people know what to expect</div>}
                {reviews?.map(review => {
                  const reviewMonth = months[new Date(review.createdAt).getMonth()];
                  const day = (new Date(review.createdAt).getDate()) + 1;
                  const year = new Date(review.createdAt).getFullYear();

                  return (
                    <div key={review.id}>
                      <button className='open-menu-button' onClick={handleClick}><i className="far fa-smile" style={{color:'#25d066',}}></i></button>
                      <p className='user-firstname'>{review.User?.firstName} {review.User?.lastName}</p>
                      <p className='date'>{reviewMonth} {day}, {year}</p>
                      <div className='star-rating'>
                        {[...Array(review.stars)].map((star, index) => (
                          <i key={index} className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                        ))}
                      </div>
                      <p className='review-text'>{review.review}</p>
                      {review.userId === user?.id && <OpenModalButton
                        modalComponent={<DeleteReviewModal id={review.id} locationId={review.locationId} setIsVisible={setIsVisible}/>}
                        buttonText="Delete"
                        buttonType="Delete"
                      />}
                      {review.userId === user?.id && <OpenModalButton
                          modalComponent={<EditReviewModal id={review.id} locationId={review.locationId} setIsVisible={setIsVisible}/>}
                          buttonText="Edit"
                          buttonType="edit"
                      />}
                    </div>
                  )
                })}
              </div>
            </div>
            }
            </div>
            </div>
        </div>
    )
}

export default LocationDetailsPage;
