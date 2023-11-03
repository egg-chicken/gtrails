import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import * as activityActions from '../../store/activities';
import './css/create-modal.css';

const CreateActivityModal = ({locationId, id}) => {
    const dispatch = useDispatch();
    const [activityType, setActivityType] = useState('');
    const [trailConditions, setTrailConditions] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors(null);

        const submitErrors = {};

        if (!activityType) submitErrors.activityType = 'Please Select an Activity Type';
        if (activityType === 'Select an activity . . .') {
            submitErrors.activityType = 'Please Select an Activity Type';
        }
        if (!trailConditions) submitErrors.trailConditions = 'Please enter the trail conditions';
        if (submitErrors.activityType || submitErrors.trailConditions){
            setErrors(submitErrors);
            return
        }

        if (!errors) {

            const activityData = {
                activityType,
                trailConditions,
              };

              const data = await dispatch(activityActions.createActivity(locationId, activityData))

              if(data){
                setErrors(data);
              } else {
                closeModal();
              }

        }
    }


    return (
        <div className="activity-container">
            <p className="review-title">Post Your Recent Activity</p>
            <div className="error-message">{errors && errors.trailConditions && <p className="error-message">{errors.trailConditions}</p>}</div>
            <div className="error-message">{errors && errors.activityType && <p className="error-message">{errors.activityType}</p>}</div>
            <form onSubmit={handleSubmit}>
                <div className="review-rating-container">
                    <label>
                    <p className="rating-text">Activity type</p>
                    <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
                        <option value="Select">Select an activity . . .</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Walking">Walking</option>
                        <option value="Running">Running</option>
                        <option value="Biking">Biking</option>
                        <option value="Mountain Biking">Mountain Biking</option>
                        <option value="Backpacking">Backpacking</option>
                        <option value="Camping">Camping</option>
                        <option value="Bird Watching">Bird Watching</option>
                        <option value="Fishing">Fishing</option>
                        <option value="Rock Climbing">Rock Climbing</option>
                        <option value="Horseback Riding">Horseback Riding</option>
                    </select>
                    </label>
                </div>
                <div className="act-sub-sec">
                    <p className="rating-text">Trail Conditions</p>
                        <input
                            className='review-input'
                            value={trailConditions}
                            placeholder="Trail Conditions"
                            onChange={(e) => setTrailConditions(e.target.value)}
                        />
                </div>
                <div className="review-submit-button-placement">
                    <button className="review-submit-button">
                        <p className='post-text'>Post</p>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default CreateActivityModal;
