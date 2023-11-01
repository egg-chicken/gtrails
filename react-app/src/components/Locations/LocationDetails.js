import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as locationActions from '../../store/locations';
import * as reviewActions from '../../store/reviews';
import * as activityActions from '../../store/activities';
import OpenModalButton from '../OpenModalButton';
import EditReviewModal from '../Reviews/EditReviewModal';
import ReviewModal from '../Reviews/CreateReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';
import CreateActivityModal from '../Activities/CreateActivityModal';
import './css/location-detail.css'

const LocationDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location[id]);
    const reviews = useSelector((state) => Object.values(state.review));
    const activities = useSelector((state) => Object.values(state.activity));
    const user = useSelector(state => state.session.user);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [upperToggleState, setUpperToggleState] = useState(1);
    const [lowerToggleState, setLowerToggleState] = useState(4);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
      dispatch(locationActions.getLocationsDetails(id))
        .then(() => setIsLoaded(true))
      dispatch(reviewActions.getAllReviews(id))
        .then(() => setIsReviewsLoaded(true))
      dispatch(activityActions.getAllActivities(id))
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

    const toggleTab = (index, isUpper) => {
      if (isUpper) {
        setUpperToggleState(index);
      } else {
        setLowerToggleState(index);
      }
    };

    const starRatingCount = Array(5).fill(0);
    reviews.forEach(review => {
      const stars = review.stars;
      if (stars >= 1 && stars <= 5) {
        starRatingCount[stars - 1]++;
      }
    });

    const averageRating = (location, decimal=1) => {
      const review = reviews.filter((review) => review.locationId === location.id);
      if(review.length > 0){
        let num = 0;
        for (let i = 0; i < review.length; i ++){
          num += review[i].stars;
        }
        const average = num / review.length;
        return average.toFixed(decimal);
      }
      return 'No reviews';
    }

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
              <div className='title-test-center'>
                <h1 className='location-name-title'>{location.name}</h1>
                <div className='location-direction'>
                  <p className='difficulty'>{location.difficulty} &#8231; </p>
                  <p className='location-rating-main'>
                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                    {averageRating(location)}
                  </p>
                </div>
                <p onClick={handleClick} className='city-state'>{location.address}</p>
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
                <button className={upperToggleState === 1 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(1, true)}><span className='tab-text'>Description</span></button>
                <button className={upperToggleState === 2 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(2, true)}><span className='tab-text'>Contact</span></button>
                <button className={upperToggleState === 3 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(3, true)}><span className='tab-text'>Getting There</span></button>
              </div>
              <div className='content-tabs'>
                <div className={upperToggleState === 1 ? 'content active-content' : 'content'}>
                  <span className='tab-text'>{location.description}</span>
                </div>
                <div className={upperToggleState === 2 ? 'content active-content' : 'content'}>
                  <span className='tab-text'>Feature Coming Soon</span>
                </div>
                <div className={upperToggleState === 3 ? 'content active-content' : 'content'}>
                  <span className='tab-text'>Feature Coming Soon</span>
                </div>
              </div>

              <div className='block-tabs'>
                <button className={lowerToggleState === 4 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(4, false)}><span className='tab-text'>Reviews ({reviews.length})</span></button>
                <button className={lowerToggleState === 5 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(5, false)}><span className='tab-text'>Activities</span></button>
                <button className={lowerToggleState === 6 ? 'tabs active-tabs' : 'tabs'} onClick={() => toggleTab(6, false)}><span className='tab-text'>Photos (0)</span></button>
              </div>

              <div className='content-tabs'>
                <div className={lowerToggleState === 4 ? 'content active-content' : 'content'}>
                  {isReviewsLoaded &&
                    <div>
                      <div className='lower-location-details-bar'>
                        <div className='star-rating-bar-graph'>
                          <div className='star-bar'>
                            {[...Array(5)].map((star, index) => (
                              <div key={index} className='star-bar-item'>
                                <div className='star-label'>{index + 1} <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/></div>
                                <div className='star-bar-fill' style={{ width: `${(starRatingCount[index] / reviews.length) * 100}px` }}></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='total-location-rating-section'>
                          <div>
                              <span className='rating-count'>
                                {averageRating(location)}
                                <i className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                              </span>
                          </div>
                          <p className='total-reviews'>{reviews.length} reviews</p>
                        </div>
                        <div className='write-review-button-placement'>
                          {isVisible && <OpenModalButton
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
                            <div className='each-review' key={review.id}>
                              <div className='top-review-info'>
                                <button className='open-menu-button' onClick={handleClick}><i className="far fa-smile" style={{color:'#25d066',}}></i></button>
                                <div className='username-date'>
                                  <p className='user-firstname'>{review.User?.firstName} {review.User?.lastName}</p>
                                  <p className='date'>{reviewMonth} {day}, {year}</p>
                                </div>
                              </div>
                              <div className='star-rating'>
                                {[...Array(review.stars)].map((star, index) => (
                                  <i key={index} className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
                                ))}
                              </div>
                              <p className='review-text'>{review.review}</p>
                              {review.userId === user?.id &&
                                <>
                                  <OpenModalButton
                                    modalComponent={<DeleteReviewModal id={review.id} locationId={review.locationId} setIsVisible={setIsVisible}/>}
                                    buttonText="Delete"
                                    buttonType="Delete"
                                  />
                                  &#124;
                                </>
                              }
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
                <div className={lowerToggleState === 5 ? 'content active-content' : 'content'}>
                  <div className='write-review-button-placement'>
                    {isVisible && <OpenModalButton
                        modalComponent={<CreateActivityModal />}
                        buttonText="Post Your Recent Activity"
                        buttonType="add"
                    />}
                  </div>
                  <div>
                    {activities?.map(activity => (
                      <div key={activity.id}>
                        <p>{activity.activityType}</p>
                        <p>{activity.trailConditions}</p>
                        <p>{activity.userId}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={lowerToggleState === 6 ? 'content active-content' : 'content'}>
                  <span className='tab-text'>Feature Coming Soon!</span>
                </div>
              </div>


          </div>
        </div>
    )
}

export default LocationDetailsPage;
