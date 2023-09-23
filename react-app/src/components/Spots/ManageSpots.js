import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteModal from './DeleteSpotModal';
import OpenModalButton from '../OpenModalButton';
import * as spotsActions from '../../store/spots';
import { Link } from 'react-router-dom';


const ManageSpotsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector((state) => state.spot);
    const spotsArray = Object.values(spots);

    useEffect(() => {
        dispatch(spotsActions.getCurrentUsersSpots())
    }, [dispatch]);

    return (
        <>
            <h1>Manage Locations</h1>
            <button onClick={(e) => {
                e.stopPropagation()
                history.push('/spots/new')
                }}>
                    Add a New Spot
            </button>
            {spots && spotsArray.map((spot) => (
                <div key={spot.id}>
                    <Link to={`/spots/${spot.id}`}>
                    <p>{spot.name}</p>
                    <p>{spot.description}</p>
                    </Link>
                    <OpenModalButton
                        modalComponent={<DeleteModal id={spot.id}/>}
                        buttonText = 'Delete'
                    />
                    <button onClick={(e) => {
                        e.stopPropagation()
                        history.push(`/spots/${spot.id}/edit`)
                        }}>
                            Edit
                    </button>
                </div>

            ))}
        </>
    )
}

export default ManageSpotsPage;
