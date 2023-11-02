import React, { useEffect, useState } from "react";
import { useModal } from '../../context/Modal';
import { useSelector, useDispatch } from "react-redux";
import * as activityActions from '../../store/activities';

const EditActivityModal = ({id}) => {
    const dispatch = useDispatch();
    const actId = useSelector((state) => state.activity[id]);

    const [activityType, setActivityType] = useState(actId?.activityType);
    const [trailConditions, setTrailConditions] = useState(actId?.trailConditions);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(activityActions.getActivitiesDetails(id))
            .then(actdetail => {
                if (actdetail){
                    setActivityType(actdetail.activityType)
                    setTrailConditions(actdetail.trailConditions)
                }
            })
            .catch((err) => {
                console.error('Error fetching review details:', err);
            });
    }, [dispatch]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = {};

        if (trailConditions.length < 10) errors.trailConditions = 'Trail Conditions must be more than 10 characters';

        setErrors(errors);

        if(Object.keys(errors).length > 0){
            setErrors(errors);
        } else {
            setErrors({});
            const formData = new FormData();
            formData.append("activityType", activityType);
            formData.append("trailConditions", trailConditions);

            dispatch(activityActions.updateActivity(id, formData))
                // .then(() => {
                //     closeModal();
                // })
                // .catch((err) => {
                //     setErrors(err)
                // })
        }
    }

    return (
        <div className="edit-activity-container">
            <p>Edit your activity</p>
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

export default EditActivityModal;
