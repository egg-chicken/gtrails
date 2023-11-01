import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import * as listActions from '../../store/lists';
import './css/list-details.css'
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const ListDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const list  = useSelector((state) => state.list[id])

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

    return (
        <div className="list-detail-container">
            <h1>{list?.listName}</h1>
            <p>Explore {list?.listName} - view hand-curated trail maps as well as detailed reviews and photos from hikers, campers and nature lovers like you</p>
            {list?.locations?.map((location, index) => (
                <div key={index}>
                    <Link to={`/locations/${location.id}`}>
                        <p>{location.name}</p>
                    </Link>
                </div>
            ))}
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    )

}

export default ListDetailPage;
