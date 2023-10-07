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
    const [toggleState, setToggleState] = useState(1);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // console.log('reviews', reviews)
    useEffect(() => {
        dispatch(locationActions.getLocationsDetails(id))
            .then(() => setIsLoaded(true))
        dispatch(reviewActions.getAllReviews(id))
            .then(() => setIsReviewsLoaded(true))
    }, [dispatch, id])

    useEffect(() => {

        if(isReviewsLoaded && isLoaded) {
          if(user){
            if(user.id !== location.userId){
              let target = true;
              reviews.forEach(el => {
                if(el.userId === user.id) target = false;
              });
              if(target === true) setIsVisible(true);
            }
          }
        }

      },[isReviewsLoaded, isLoaded, user, location, reviews])

    const handleClick = e => {
      e.preventDefault();
      alert("Feature Coming Soon!")
    };

    const toggleTab = (index) => {
      setToggleState(index);
      console.log(index)
    };

    if(!location){
        return 'no location'
    }

    return (
        <div className='location-detail-container'>
          <div className='location-border-card'>
            <div className='cover-container'>
              <div className='cover-image'>
                <img className='location-image-id' src={location.image} alt={location.image}/>
              </div>
              <h1 className='location-name-title'>{location.name}</h1>
              <div className='location-direction'>
                <p onClick={handleClick} className='city-state'>{location.address}</p>
                <p className='location-rating-main'>
                  <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                  {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'New'} ({reviews.length})
                </p>
              </div>
            </div>
            <div className='bar-links location-details-bar-buttons'>
              <div className='detail-bar-button'>
                <button className='bar-button' onClick={handleClick}><i className="far fa-images" style={{color:'#054A29',}}/></button>
                <span className='button-title'>Photos</span>
              </div>
              <div className='detail-bar-button'>
                <button className='bar-button' onClick={handleClick}><i className="fas fa-directions" style={{color:'#054A29',}}/></button>
                <span className='button-title'>Directions</span>
              </div>
              <div className='detail-bar-button'>
                <button className='bar-button' onClick={handleClick}><i className="fas fa-print" style={{color:'#054A29',}}/></button>
                <span className='button-title'>Print</span>
              </div>
              <div className='detail-bar-button'>
                <button className='bar-button' onClick={handleClick}><i className="fas fa-share" style={{color:'#054A29',}}/></button>
                <span className='button-title'>Share</span>
              </div>
              <div className='detail-bar-button'>
                <button className='bar-button' onClick={handleClick}><i className="fas fa-ellipsis-h" style={{color:'#054A29',}}/></button>
                <span className='button-title'>More</span>
              </div>
            </div>
            <div className='location-details-bar'>
              <div className='detail-bar'>
                <span className='label non-bold-text'>Length:</span>
                <span className='value bold-text'>{location.length} mi</span>
              </div>
              <div className='detail-bar'>
                <span className='label non-bold-text'>Elevation Gain:</span>
                <span className='value bold-text'>{location.elevGain} ft</span>
              </div>
              <div className='detail-bar'>
                <span className='label non-bold-text'>Route Type:</span>
                <span className='value bold-text'>{location.routeType}</span>
              </div>
            </div>
            <p className='info-box'>Check out this {location.length} mile {location.routeType} near {location.city}, {location.state}.</p>

              <div className='block-tabs'>
                <button className={toggleState === 1 ? 'tabs active-tabs': 'tabs'} onClick={() => toggleTab(1)}><span className='tab-text'>Description</span></button>
                <button className={toggleState === 2 ? 'tabs active-tabs': 'tabs'} onClick={() => toggleTab(2)}><span className='tab-text'>Contact</span></button>
                <button className={toggleState === 3 ? 'tabs active-tabs': 'tabs'} onClick={() => toggleTab(3)}><span className='tab-text'>Getting There</span></button>
              </div>
              <div className='content-tabs'>
                <div className={toggleState === 1 ? 'content active-content': 'content'}>
                  <span className='tab-text'>{location.description}</span>
                </div>
                <div className={toggleState === 2 ? 'content active-content': 'content'}>
                  <span className='tab-text'>Feature Coming Soon</span>
                </div>
                <div className={toggleState === 3 ? 'content active-content': 'content'}>
                  <span className='tab-text'>Feature Coming Soon</span>
                </div>
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
