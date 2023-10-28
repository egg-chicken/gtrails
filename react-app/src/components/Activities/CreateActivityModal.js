import React, { useState } from "react";

const CreateActivityModal = () => {
    const [activityType, setActivityType] = useState('');
    const [trailConditions, setTrailConditions] = useState('');
    const [errors, setErrors] = useState({});

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

    }


    return (
        <div className="activity-container">
            <p>location name</p>
            <form onSubmit={handleSubmit}>
                <label>Activity type
                    <input
                        value={activityType}
                        placeholder="Activity Type"
                        onChange={(e) => setActivityType(e.target.value)}
                    />
                </label>
                <label>Trail Conditions
                    <input
                        value={trailConditions}
                        placeholder="Trail Conditions"
                        onChange={(e) => setTrailConditions(e.target.value)}
                    />
                </label>
                <button>Post</button>
            </form>
        </div>
    )
};

export default CreateActivityModal;
