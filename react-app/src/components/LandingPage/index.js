import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as spotActions from '../../store/spots';
import './mainpage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArray = spots ? Object.values(spots): [];

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    return (
        <div className="a-container">
            <div className="cover">
                <h1 className="c-title">Find your outdoors</h1>
                <NavLink exact to="/explore" className='explore-l'>Explore nearby trails</NavLink>
            </div>
            <div className="b-container">
                <p className="parks-text">Parks worth a look</p>
                    <div className="spot-container-m">
                        {spotsArray.slice(0,4).map((spot) => (
                            <Link key={spot.id} to={`/spots/${spot.id}`} className='spot'>
                                    <a key={spot.id} href="#" className="spot-card spot">
                                    <img src={spot.image} alt='spot' className='spot-images' title={spot.name}/>
                                    <p className='a-details'>{spot.name}</p>
                                    <p>{spot.city}, {spot.state}</p>
                                    <p className='spot-rating'>
                                        <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                        {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'New'}
                                    </p>
                                    <p className='b-details'>Length: {spot.length} mi &#8231; Type: {spot.routeType}</p>
                                    </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <h2>Cities to explore</h2>
                <h2>Countries to consider</h2>
                <h2>Browse by activity</h2>
                <h3>Share your next adventure! by tagging me :) </h3>

        </div>
    )
}

export default LandingPage
