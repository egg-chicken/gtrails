import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import './explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = spots ? Object.values(spots): [];

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    return (
        <div className='spot-container'>
            <p className='t-detail'>Explore All Locations</p>
                {spotsArray.map((spot) => (
                    <Link key={spot.id} to={`/spots/${spot.id}`} className='spot'>
                            <img src={spot.image} alt='spot prev' className='image' title={spot.name}/>
                            <div className="spot-details">
                                <p className='a-details'>{spot.name}</p>
                                <p className='spot-rating'>
                                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                    {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'No Reviews'}
                                </p>
                            </div>
                            <p className='b-details'>Length: {spot.length} mi &#8231; Type: {spot.routeType}</p>
                    </Link>
                ))}
        </div>
    )
}

export default ExplorePage;
