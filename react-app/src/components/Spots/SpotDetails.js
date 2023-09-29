import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import EditReviewModal from '../Reviews/EditReviewModal';
import ReviewModal from '../Reviews/CreateReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import './css/spot-detail.css'

const SpotDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);
    const reviews = useSelector((state) => Object.values(state.review));
    const user = useSelector(state => state.session.user);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        dispatch(spotActions.getSpotsDetails(id))
            .then(() => setIsLoaded(true))
        dispatch(reviewActions.getAllReviews(id))
            .then(() => setIsReviewsLoaded(true))
    }, [dispatch, id])

    useEffect(() => {
        if(isReviewsLoaded && isLoaded) {
            if(user){
              if(user.id !== spot.ownerId){
                let target = true;
                reviews.forEach(el => {
                  if(el.userId === user.id) target = false;
                });
                if(target === true) setIsVisible(true);
              }
            }
        }
      },[isReviewsLoaded, isLoaded, user, spot, reviews])

    const handleClick = e => {
      e.preventDefault();
      alert("Feature Coming Soon!")
    }

    if(!spot){
        return 'no spot'
    }

    return (
        <div className='spot-detail-container'>
          <div className='spot-border-card'>
            <div className='cover-container'>
              <img className='spot-image-id' src={spot.image} alt={spot.image}/>
              <p className='spot-detail-title'>{spot.name}</p>
            </div>
            <div>{spot.city}, {spot.state}</div>
            <p className='spot-rating'>
                <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'New'}
            </p>
            <div className='spot-details-bar'>
              <p>Length: {spot.length}</p>
              <p>Elevation Gain: {spot.elevGain}</p>
              <p>Route Type: {spot.routeType}</p>
            </div>
            <p>Check out this {spot.length} mile {spot.routeType} near {spot.city}, {spot.state}.</p>
            <p>Description</p>
            <div className='desc-box'>
              <p>{spot.description}</p>
            </div>

            <p>Reviews</p>
            <div className='rev-box'>
            {isReviewsLoaded &&
            <div>
                <p>Average Review</p>
                <p className='spot-rating'>
                  <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                  {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'New'}
                </p>
                <OpenModalButton
                    modalComponent={<ReviewModal id={spot.id}/>}
                    buttonText='Write a Review'
                />
                <div className='s-review-box'>
                {reviews?.map(review => {
                const reviewMonth = months[new Date(review.createdAt).getMonth()];
                const day = (new Date(review.createdAt).getDate()) + 1;
                const year = new Date(review.createdAt).getFullYear();

                return (
                  <div key={review.id}>
                    <button className='open-menu-button' onClick={handleClick}>
                      <i class="far fa-smile" style={{color:'#25d066',}}></i>
                    </button>
                    <p className='user-firstname'>{review.User?.firstName}</p>
                    <p className='date'>{reviewMonth} {day}, {year}</p>
                    <p className='review-text'>{review.review}</p>
                    {review.userId === user?.id && <OpenModalButton
                      modalComponent={<DeleteReviewModal id={review.id} spotId={review.spotId} setIsVisible={setIsVisible}/>}
                      buttonText='Delete'
                    />}
                    {review.userId === user?.id && <OpenModalButton
                        modalComponent={<EditReviewModal id={review.id} spotId={review.spotId} setIsVisible={setIsVisible}/>}
                        buttonText='Edit'
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

export default SpotDetailsPage;
