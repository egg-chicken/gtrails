import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../Reviews/CreateReviewModal';
import DeleteReviewModal from '../Reviews/DeleteReviewModal';

const SpotDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);
    const reviews = useSelector((state) => Object.values(state.review));
    const user = useSelector(state => state.session.user);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

    if(!spot){
        return 'no spot'
    }

    return (
        <>
            <h1>{spot.name}</h1>
            <div>spot difficulty + review</div>
            <div>{spot.address}</div>
            <li>
				<NavLink exact to='/photos'>Photos</NavLink>
			</li>
            <div>Length: {spot.length}</div>
            <div>Elevation Gain: {spot.elevGain}</div>
            <div>Route Type: {spot.routeType}</div>
            <p>fdjkfgkgdflkgjdlfglfgjdfkg lol</p>
            <div>{spot.description}</div>
            {isReviewsLoaded &&
            <div>
                <p>Reviews</p>
                <p>Photos</p>
                <p>Average Review</p>
                <OpenModalButton
                    modalComponent={<ReviewModal id={spot.id}/>}
                    buttonText='Write a Review'
                />
                {reviews?.map(review => {
                const year = new Date(review.createdAt).getFullYear();

                return (
                  <div key={review.id}>
                    <p className='user-firstname'>{review.User?.firstName}</p>
                    <p className='date'>{year}</p>
                    <p className='review-text'>{review.review}</p>
                    {review.userId === user?.id && <OpenModalButton
                      modalComponent={<DeleteReviewModal id={review.id} spotId={review.spotId} setIsVisible={setIsVisible}/>}
                      buttonText='Delete'
                    />}
                  </div>
                )
              })}
            </div>
            }
        </>
    )
}

export default SpotDetailsPage;
