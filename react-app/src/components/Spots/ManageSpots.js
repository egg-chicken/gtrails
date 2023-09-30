import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from './DeleteSpotModal';
import OpenModalButton from '../OpenModalButton';
import * as spotsActions from '../../store/spots';
import { Link } from 'react-router-dom';
import './css/manage-spot.css';

const ManageSpotsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
        dispatch(spotsActions.getCurrentUsersSpots())
    }, [dispatch]);

    return (
        <div className='manage-locations-container'>
            <h1>Manage Locations</h1>
            <div className='add-box'>
                <p className='add-box'>Found a location?</p>
                <button onClick={(e) => {
                    e.stopPropagation()
                    history.push('/spots/new')
                    }}>
                        Add a New Spot
                </button>
            </div>
            <div className='spot-grid'>
                {spotsArray.map((spot) => (
                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`} className='spot'>
                            <img src={spot.image} alt='spot prev' className='image' title={spot.name}/>
                            <div className="spot-details">
                                <p>{spot.name}</p>
                                <p className='spot-rating'>
                                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                    {spot.avgRating ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating.toFixed(1)) : 'No Reviews'}
                                </p>
                            </div>
                            <p className="b-detail">{spot.city}, {spot.state}</p>
                        </Link>
                        <OpenModalButton
                            modalComponent={<DeleteModal id={spot.id}/>}
                            buttonText="Delete"
                            buttonType="Delete"
                        />
                        <button className='edit-button' onClick={(e) => {
                            e.stopPropagation()
                            history.push(`/spots/${spot.id}/edit`)
                            }}>
                                Edit
                        </button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ManageSpotsPage;
