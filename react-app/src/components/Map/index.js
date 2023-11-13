import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from '!mapbox-gl';// eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import './map-details.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-120.5);
    const [lat, setLat] = useState(43.8);
    const [zoom, setZoom] = useState(4);
    const locations = useSelector((state) => Object.values(state.location));

    console.log('map locations: !!!', locations)
    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        // style: 'mapbox://styles/mapbox/streets-v12',
        style: "mapbox://styles/eggoreochip/cloqt5zfj006v01r7ewza7naq",
        center: [lng, lat],
        zoom: zoom
        });
        addMarkersToMap();
    }, []);

    const addMarkersToMap = () => {
        locations.forEach((location) => {
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
        <div ref={mapContainer} className="map-container" />
    )

};

export default Map;
