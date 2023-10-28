import React, { useEffect, useState } from "react";
import { useModal } from '../../context/Modal';

const EditActivityModal = () => {
    const [activityType, setActivityType] = useState('');
    const [trailConditions, setTrailConditions] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
    });

    return (
        <div className="edit-activity-container">
            <p>Edit your activity</p>
            <form>
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

export default EditActivityModal;
