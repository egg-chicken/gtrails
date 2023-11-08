import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import DeleteLocationFromListModal from './DeleteLocationFromList';
import * as listActions from '../../store/lists';
import './css/list-details.css'
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const ListDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const list  = useSelector((state) => state.list[id])
    const location = useSelector((state => state.location[id]))

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-120.5);
    const [lat, setLat] = useState(43.8);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        dispatch(listActions.getListsDetails(id))
    }, [dispatch, id]);


    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });
        addMarkersToMap();
    }, []);

    const addMarkersToMap = () => {
        list?.locations?.forEach((location) => {
            const { lat, lng } = location;
            new mapboxgl.Marker({
                color: "#2ced39",
            })
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setHTML(
                    `<p>${location.name}</p>
                    <a href='/locations/${location.id}'>See locations details</a>
                    `))
                .addTo(map.current);
        });

    };

    addMarkersToMap();

    const handleClick = e => {
        e.preventDefault();
        alert("Feature Coming Soon!")
    };

    return (
        <div className="list-detail-container">
            <div className='list-border-card'>
            <div className="list-cover">
                <h1 className="list-title">{list?.listName}</h1>
            </div>
            <div className="list-bar-links location-details-bar-buttons">
                <div className='detail-bar-button'>
                    <button className='bar-button' onClick={handleClick}><i className="fas fa-directions" style={{color:'#054A29',}}/></button>
                    <span className='button-title'>Directions</span>
                </div>
                <div className='detail-bar-button'>
                    <button className='bar-button' onClick={handleClick}><i className="fas fa-print" style={{color:'#054A29',}}/></button>
                    <span className='button-title'>Print</span>
                </div>
                <div className='detail-bar-button'>
                    <button className='bar-button' onClick={handleClick}><i className="fas fa-share" style={{color:'#054A29',}}/></button>
                    <span className='button-title'>Share</span>
                </div>
                <div className='detail-bar-button'>
                    <button className='bar-button' onClick={handleClick}><i className="fas fa-ellipsis-h" style={{color:'#054A29',}}/></button>
                    <span className='button-title'>More</span>
                </div>
            </div>
            <div className="list-body">
                <div className="left-side">
                    <p className="list-description">Explore {list?.listName} - view hand-curated trail maps as well as detailed reviews and photos from hikers, campers and nature lovers like you</p>
                    <div ref={mapContainer} className="map-container" />
                </div>
                <div className="right-side">
                    {list?.locations?.map((location, index) => (
                        <div key={index}>
                            <Link to={`/locations/${location.id}`} className='location'>
                                <img src={location.image} alt='location' className='image' title={location.name}/>
                                <p>{location.name}</p>
                                <p className='location-rating'>
                                    <i className="fa fa-solid fa-star" style={{color:'#2ced39',}}/>
                                    {location.avgRating ? (Number.isInteger(location.avgRating) ? location.avgRating.toFixed(1) : location.avgRating.toFixed(1)) : 'No Reviews'}
                                </p>
                            </Link>
                            <OpenModalButton
                                modalComponent={<DeleteLocationFromListModal listId={id} locationId={location.id}/>}
                                buttonText={<i class="far fa-trash-alt"></i>}
                                buttonType="Delete"
                            />
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )

}

export default ListDetailPage;
