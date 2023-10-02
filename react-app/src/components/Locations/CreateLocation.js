import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as locationActions from '../../store/locations'

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
    const [elevGain, setElevGain] = useState('');
    const [routeType, setRouteType] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState({});

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
        <>
        <div className="page-container">
        <div className="form-create">
            <h1>Create a New Location</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div>
                <div className="error-message">{errors.name && <p className="">{errors.name}</p>}</div>
                <label className="label-create">
                    Location Name
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Location Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.address && <p className="">{errors.address}</p>}</div>
                <label className="label-create">
                    Address
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.city && <p className="">{errors.city}</p>}</div>
                <label className="label-create">
                    City
                    <input
                        className="input-create"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.state && <p className="">{errors.state}</p>}</div>
                <label className="label-create">
                    State
                    <input
                        className="input-create"
                        type='text'
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.country && <p className="">{errors.country}</p>}</div>
                <label className="label-create">
                    Country
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.lat && <p className="">{errors.lat}</p>}</div>
                <label className="label-create">
                    Latitude
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.lng && <p className="">{errors.lng}</p>}</div>
                <label className="label-create">
                    Longitude
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.description && <p className="">{errors.description}</p>}</div>
                <label className="label-create">
                    Description
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.length && <p className="">{errors.length}</p>}</div>
                <label className="label-create">
                    length
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Mile Length"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.elevGain && <p className="">{errors.elevGain}</p>}</div>
                <label className="label-create">
                    Elevation Gain
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Elevation Gain"
                        value={elevGain}
                        onChange={(e) => setElevGain(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.routeType && <p className="">{errors.routeType}</p>}</div>
                <label className="label-create">
                    Route Type
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Route Type"
                        value={routeType}
                        onChange={(e) => setRouteType(e.target.value)}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{errors.image && <p className="">{errors.image}</p>}</div>
                <label className="label-create">
                    Image
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                </div>
                <div className="align-create-button">
                <button className='create-button test' type="submit">Create :)</button>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default CreateLocationForm;