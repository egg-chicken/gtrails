import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import * as reviewActions from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../Reviews/CreateReviewModal';

const SpotDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);
    const reviews = useSelector((state) => Object.values(state.review));

    useEffect(() => {
        dispatch(spotActions.getSpotsDetails(id))
        dispatch(reviewActions.getAllReviews(id))
    }, [dispatch, id])

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
                  </div>
                )
              })}
            </div>
        </>
    )
}

export default SpotDetailsPage;
