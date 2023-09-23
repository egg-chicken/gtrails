import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots';


const SpotDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot[id]);

    useEffect(() => {
        dispatch(spotActions.getSpotsDetails(id))
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
            <div>Reviews + num</div>
            <div>Photos + num</div>
            <div>average review</div>
            <div>Write Review button</div>

        </>
    )
}

export default SpotDetailsPage;
