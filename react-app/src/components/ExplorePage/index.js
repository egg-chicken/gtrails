import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as locationActions from '../../store/locations';
import './explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location);
    const locationsArray = locations ? Object.values(locations): [];

    useEffect(() => {
        dispatch(locationActions.getLocations())
    }, [dispatch])

    return (
        <div className='explore-container'>
            <h1 className='parks-text'>Explore All Locations</h1>
                <div className='location-grid'>
                    {locationsArray.map((location) => (
                        <Link key={location.id} to={`/locations/${location.id}`} className='location'>
                            <img src={location.image} alt='location prev' className='image' title={location.name}/>
                            <div className="location-details">
                                <p className='a-detail'>{location.name}</p>
                                <p className='location-rating'>
                                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                    {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'No Reviews'}
                                </p>
                            </div>
                            <p className="b-detail">{location.city}, {location.state}</p>
                            <p className='b-detail'>Length: {location.length} mi &#8231; Type: {location.routeType}</p>
                        </Link>
                    ))}
                </div>
        </div>
    )
}

export default ExplorePage;
