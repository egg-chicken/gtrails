import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import * as activityActions from '../../store/activities';
import './css/create-modal.css';

const CreateActivityModal = ({locationId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [activityType, setActivityType] = useState('');
    const [trailConditions, setTrailConditions] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    // const location = useSelector((state) => state.location[id]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors(null);

        const submitErrors = {};

        if (!activityType) submitErrors.activityType = 'Please Select an Activity Type';
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
            <p className="activity-title">location name</p>
            <form onSubmit={handleSubmit}>
                <div className="act-sub-sec">
                    <label>Activity type
                        <input
                            value={activityType}
                            placeholder="Activity Type"
                            onChange={(e) => setActivityType(e.target.value)}
                        />
                    </label>
                </div>
                <div className="act-sub-sec">
                    <label>Trail Conditions
                        <input
                            value={trailConditions}
                            placeholder="Trail Conditions"
                            onChange={(e) => setTrailConditions(e.target.value)}
                        />
                    </label>
                </div>
                <button className="review-submit-button">Post</button>
            </form>
        </div>
    )
};

export default CreateActivityModal;
