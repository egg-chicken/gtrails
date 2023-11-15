import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as locationActions from '../../store/locations';
import SaveToModal from "../Lists/SaveToListModal";
import OpenModalButton from "../OpenModalButton";
import Map from '../Map';
import './explore.css'

const ExplorePage = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location);
    const locationsArray = locations ? Object.values(locations): [];
    const user = useSelector(state => state.session.user);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        dispatch(locationActions.getLocations())
    }, [dispatch]);

    useEffect(() => {
        if (user){
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    });

    return (
        <div className='explore-container'>

            <div className='scrolling-section'>
            <h1 className='parks-text'>Explore All Locations</h1>
            <div className='location-grid'>
                {locationsArray.map((location) => (
                    <div key={location.id} className='explore-test'>
                    {showButton && <OpenModalButton
                            modalComponent={<SaveToModal locationId={location.id} />}
                            buttonText={<i className="far fa-bookmark"></i>}
                            buttonType='exploreList'
                        />}
                    <Link key={location.id} to={`/locations/${location.id}`} className='location-explore-tile'>
                        <img src={location.image} alt='location' className='image' title={location.name}/>
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
                    </div>
                ))}
            </div>
            </div>
            <div>
                <Map />
            </div>
        </div>
    )
}

export default ExplorePage;
