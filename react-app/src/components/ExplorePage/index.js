import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';

const Explore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch])

    return (
        <>
            <h1>Explore</h1>
        </>
    )
}

export default Explore;
