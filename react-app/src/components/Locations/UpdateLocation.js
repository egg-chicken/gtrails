import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as locationActions from '../../store/locations';

const UpdateLocationForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const location = useSelector((state) => state.location[id]);


    const [name, setName] = useState(location?.name || '');
    const [address, setAddress] = useState(location?.address || '');
    const [city, setCity] = useState(location?.city || '');
    const [state, setState] = useState(location?.state || '');
    const [country, setCountry] = useState(location?.country || '');
    const [lat, setLat] = useState(location?.lat || '');
    const [lng, setLng] = useState(location?.lng || '');
    const [length, setLength] = useState(location?.length || '');
    const [description, setDescription] = useState(location?.description || '');
    const [elevGain, setElevGain] = useState(location?.elevGain || '');
    const [routeType, setRouteType] = useState(location?.routeType || '');
    const [image, setImage] = useState(location?.image || '');

    const [errors, setErrors] = useState({});

    useEffect(() => {
            dispatch(locationActions.getLocationsDetails(id))
            .then(locationdetail => {
                if(locationdetail){
                    setName(locationdetail?.name)
                    setAddress(locationdetail?.address)
                    setCity(locationdetail?.city)
                    setState(locationdetail?.state)
                    setCountry(locationdetail?.country)
                    setLat(locationdetail?.lat)
                    setLng(locationdetail?.lng)
                    setLength(locationdetail?.length)
                    setDescription(locationdetail?.description)
                    setElevGain(locationdetail?.elevGain)
                    setRouteType(locationdetail?.routeType)
                    setImage(locationdetail?.image)
                }
            })
            .catch((err) => {
                console.error('Error fetching location details:', err);
            });
    }, [dispatch, id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if(!name) errors.name = 'Name is required';
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(!country) errors.country = 'Country is required';
        if(!lat) errors.lat = 'Latitude is required';
        if(!lng) errors.lng = 'Longitude is required';
        if(!length) errors.length = 'Length is required';
        if(!description) errors.description = 'Description is required';
        if(!elevGain) errors.elevGain = 'Elevation Gain is required';
        if(!routeType) errors.routeType = 'Route Type is required';
        if(!image) errors.image = 'Image URL is required';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
          } else {
            setErrors({});
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("country", country);
            formData.append("lat", lat);
            formData.append("lng", lng);
            formData.append("description", description);
            formData.append("length", length);
            formData.append("elevGain", elevGain);
            formData.append("routeType", routeType);
            formData.append("image", image);

            dispatch(locationActions.updateLocation(id, formData))
                .then((location) => {
                    history.push(`/locations/${location.id}`)
                })
                .catch((err) => {
                    setErrors(err)
                })
          }
    }

    return (
        <div className="location-detail-container">
            <div className="location-border-card">
                <div className='form-create'>
                    <p className='location-detail-title'>Update Location</p>
                    <form className='location-body' onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="error-message">{errors.name && <p className="error-message">{errors.name}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Location Name</p>
                            <input
                                className="input-create"
                                type='text'
                                name="name"
                                placeholder="Location Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                        <div className="error-message">{errors.address && <p className="error-message">{errors.address}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Address</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.city && <p className="error-message">{errors.city}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">City</p>
                            <input
                                className="input-create"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.state && <p className="error-message">{errors.state}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">State</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.country && <p className="error-message">{errors.country}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Country</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.lat && <p className="error-message">{errors.lat}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Latitude</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Latitude"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.lng && <p className="error-message">{errors.lng}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Longitude</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Longitude"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.description && <p className="error-message">{errors.description}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Description</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.length && <p className="error-message">{errors.length}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">length</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Length"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.elevGain && <p className="error-message">{errors.elevGain}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Elevation Gain</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Elevation Gain"
                                value={elevGain}
                                onChange={(e) => setElevGain(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.routeType && <p className="error-message">{errors.routeType}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Route Type</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Route Type"
                                value={routeType}
                                onChange={(e) => setRouteType(e.target.value)}
                            />
                        </div>
                        </div>
                        <div>
                        <div className="error-message">{errors.image && <p className="error-message">{errors.image}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Image</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="sign-button-container">
                            <div className='login-button'>
                                <button className='login-submit-button' type="submit"><p className="login-text">Update</p></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateLocationForm;
