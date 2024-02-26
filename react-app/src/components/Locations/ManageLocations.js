import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from './DeleteLocationModal';
import OpenModalButton from '../OpenModalButton';
import * as locationsActions from '../../store/locations';
import { Link } from 'react-router-dom';
import './css/manage-location.css';

const ManageLocationsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const locations = useSelector((state) => state.location);
    const locationsArray = Object.values(locations);

    useEffect(() => {
        dispatch(locationsActions.getCurrentUsersLocations())
    }, [dispatch]);

    return (
        <div className='manage-locations-container'>
            <h1>Manage Locations</h1>
            <div className='add-box'>
                <p className='add-box'>Found a location?</p>
                <div className='new-loc-button'>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        history.push('/locations/new')
                        }}>
                            Add a New Location
                    </button>
                </div>
            </div>
            <div className='location-grid-manage'>
                {locationsArray.map((location) => (
                    <div key={location.id}>
                        <Link to={`/locations/${location.id}`} className='location-img-link'>
                            <img src={location.image} alt='location prev' className='image' title={location.name}/>
                            <div className="location-details">
                                <p className='loc-name-detail'>{location.name}</p>
                                <p className='location-rating'>
                                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                    {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'No Reviews'}
                                </p>
                            </div>
                            <p className="b-detail">{location.city}, {location.state}</p>
                        </Link>
                        <OpenModalButton
                            modalComponent={<DeleteModal id={location.id}/>}
                            buttonText="Delete"
                            buttonType="Delete"
                        />&#124;
                        <button className='edit-button' onClick={(e) => {
                            e.stopPropagation()
                            history.push(`/locations/${location.id}/edit`)
                            }}>
                                Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageLocationsPage;
