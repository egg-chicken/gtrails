import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as locationActions from '../../store/locations';
import './mainpage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location);
    const locationsArray = locations ? Object.values(locations): [];

    useEffect(() => {
        dispatch(locationActions.getLocations())
    }, [dispatch])

    return (
        <div className="a-container">
            <div className="cover">
                <h1 className="c-title">Find your outdoors</h1>
                <NavLink exact to="/explore" className='explore-l'>Explore nearby trails</NavLink>
            </div>
            <div className="b-container">
                <p className="parks-text">Parks worth a look</p>
                    <div className="location-container-m">
                        {locationsArray.slice(0,4).map((location) => (
                            <Link key={location.id} to={`/locations/${location.id}`} className='location'>
                                    <a key={location.id} href="#" className="location">
                                    <img src={location.image} alt='location' className='location-images' title={location.name}/>
                                    <div className="location-details">
                                        <p className='a-detail'>{location.name}  </p>
                                        <p className='location-rating'>
                                            <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                            {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'New'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="b-detail">{location.city}, {location.state}</p>
                                        <p className="b-detail">Length: {location.length} mi &#8231;  {location.routeType}</p>
                                    </div>
                                    </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="parks-text">
                    <p className="parks-text">Locations to explore</p>
                    <div className="location-container-m">
                        {locationsArray.slice(4,8).map((location) => (
                            <Link key={location.id} to={`/locations/${location.id}`} className='location'>
                                    <a key={location.id} href="#" className="location">
                                    <img src={location.image} alt='location' className='location-images' title={location.name}/>
                                    <div className="location-details">
                                        <p className='a-detail'>{location.name}  </p>
                                        <p className='location-rating'>
                                            <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                            {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'New'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="b-detail">{location.city}, {location.state}</p>
                                        <p className="b-detail">Length: {location.length} mi &#8231;  {location.routeType}</p>
                                    </div>
                                    </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="parks-text">
                    <p className="parks-text">Get away from the city</p>
                    <div className="location-container-m">
                        {locationsArray.slice(8,12).map((location) => (
                            <Link key={location.id} to={`/locations/${location.id}`} className='location'>
                                    <a key={location.id} href="#" className="location">
                                    <img src={location.image} alt='location' className='location-images' title={location.name}/>
                                    <div className="location-details">
                                        <p className='a-detail'>{location.name}  </p>
                                        <p className='location-rating'>
                                            <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                            {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'New'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="b-detail">{location.city}, {location.state}</p>
                                        <p className="b-detail">Length: {location.length} mi &#8231;  {location.routeType}</p>
                                    </div>
                                    </a>
                            </Link>
                        ))}
                    </div>
                </div>

                <h3>Share your next adventure! by tagging me :) </h3>

        </div>
    )
}

export default LandingPage
