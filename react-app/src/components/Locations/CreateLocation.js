import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as locationActions from '../../store/locations';
import './css/create-location.css';

const CreateLocationForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [elevGain, setElevGain] = useState('');
    const [routeType, setRouteType] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {

        e.preventDefault();

        const errors = {};

        if(!name) errors.name = 'Name is required';
        if(name.length > 50) errors.name = 'Name must be less than 30 characters'
        if(name.length <= 3) errors.name = 'Name must be more than 3 characters'
        if(!address) errors.address = 'Address is required';
        if(!city) errors.city = 'City is required';
        if(!state) errors.state = 'State is required';
        if(!country) errors.country = 'Country is required';
        if (isNaN(parseFloat(lat)) || parseFloat(lat) < -90 || parseFloat(lat) > 90) {
            errors.lat = 'Invalid latitude. Must be less than -90 degrees or greater than 90 degrees.';
        }
        if (isNaN(parseFloat(lng)) || parseFloat(lng) < -180 || parseFloat(lng) > 180) {
            errors.lng = 'Invalid longitude. Must be less than -180 degrees or greater than 180 degrees.';
        }
        if (!length || isNaN(parseFloat(length))) {
            errors.length = 'Length is required (Must be a number)';
        }
        if(!description) errors.description = 'Description is required';
        if(description.length > 250) errors.description = 'Description cannot be more than 250 characters'
        if(!difficulty) errors.description = 'Difficulty is required';
        if (!elevGain || isNaN(parseFloat(elevGain))) {
            errors.elevGain = 'Elevation Gain is required (Must be a number)';
        }
        if(!routeType) errors.routeType = 'Route Type is required';
        if(!image) errors.image = 'Image URL is required';
        if(image && !image.endsWith('.png') && !image.endsWith('.jpg') && !image.endsWith('.jpeg')) errors.image = 'Image URL must end in .png, .jpg, .jpeg';

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("country", country);
            formData.append("lat", lat);
            formData.append("lng", lng);
            formData.append("description", description);
            formData.append("difficulty", difficulty);
            formData.append("length", length);
            formData.append("elevGain", elevGain);
            formData.append("routeType", routeType);
            formData.append("image", image);

        try {
            await dispatch(locationActions.createLocation(formData));
            history.push("/explore");
        } catch (err){
            setErrors({});
            console.error("Error creating location:", err);
        }
    }


    }

    return (
        <div className="location-detail-container">
            <div className='location-border-card'>
                <div className="form-create">
                <p className='location-detail-title'>Create a New Location</p>
                    <form className='location-body' onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="error-message">{errors.name && <p className="error-message">{errors.name}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Location Name</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Location Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                        <div className="error-message">{errors.city && <p className="error-message">{errors.city}</p>}</div>
                        <div className="error-message">{errors.state && <p className="error-message">{errors.state}</p>}</div>
                        <div className="city-state">
                            <div className="form-container-create-2">
                                <p className="sub-text-signup">City</p>
                                <input
                                    className="input-create"
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="form-container-create-2">
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
                        <div className="error-message">{errors.difficulty && <p className="error-message">{errors.difficulty}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Difficulty</p>
                            <select
                                className="create-loc"
                                onChange={(e) => setDifficulty(e.target.value)}
                                required
                            >
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Difficult">Difficult</option>
                            </select>
                        </div>
                        <div className="error-message">{errors.length && <p className="error-message">{errors.length}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Mile Length</p>
                            <input
                                className="input-create"
                                type='text'
                                placeholder="Mile Length"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </div>
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
                        <div className="error-message">{errors.routeType && <p className="error-message">{errors.routeType}</p>}</div>
                        <div className="form-container-create">
                            <p className="sub-text-signup">Route Type</p>
                            <select
                                className="create-loc"
                                onChange={(e) => setRouteType(e.target.value)}
                                required
                            >
                                <option value="Loop">Loop</option>
                                <option value="Out & Back">Out & Back</option>
                                <option value="Point to Point">Point to Point</option>
                            </select>
                            {/* <input
                                className="input-create"
                                type='text'
                                placeholder="Route Type"
                                value={routeType}
                                onChange={(e) => setRouteType(e.target.value)}
                            /> */}
                        </div>
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
                        <div className="sign-button-container">
                            <div className="login-button">
                                <button className='login-submit-button' type="submit"><p className="login-text">Create</p></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateLocationForm;
