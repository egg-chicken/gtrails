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
        <div className="container">
            <div className="main-bar">
                <h1 className="main-title">Find your outdoors</h1>
                <NavLink exact to="/explore">Explore nearby trails</NavLink>
            </div>
            <div>
                {/* <h1>Let's find a new trail, add user name</h1> */}
                <h2 className="parks-text">Parks worth a look</h2>
                    <div className="spot-container-main-page">
                        {spotsArray.slice(0,4).map((spot) => (
                            <Link key={spot.id} to={`/spots/${spot.id}`} className='spot'>
                                    <a key={spot.id} href="#" className="spot-card spot">
                                    <img src={spot.image} alt='spot' className='image-main-page' title={spot.name}/>
                                    <p className='spot-rating'>
                                        <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                        {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'New'}
                                    </p>
                                    <p className='a-details'>{spot.name}</p>
                                    <p className='b-details'>Length: {spot.length} mi &#8231; Type: {spot.routeType}</p>
                                    </a>
                            </Link>
                        ))}
                    </div>
                <h2>Cities to explore</h2>
                <h2>Countries to consider</h2>
                <h2>Browse by activity</h2>
                <h3>Share your next adventure! by tagging me :) </h3>
            </div>
        </div>
    )
}

export default LandingPage
