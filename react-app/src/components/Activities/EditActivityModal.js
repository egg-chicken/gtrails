import React, { useEffect, useState } from "react";
import { useModal } from '../../context/Modal';
import { useSelector, useDispatch } from "react-redux";
import * as activityActions from '../../store/activities';

const EditActivityModal = ({id}) => {
    const dispatch = useDispatch();
    const actId = useSelector((state) => state.activity[id]);

    const [activityType, setActivityType] = useState(actId.activityType);
    const [trailConditions, setTrailConditions] = useState(actId.trailConditions);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    useEffect(() => {
        dispatch(activityActions.getActivitiesDetails(id))
    }, [dispatch]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errorMess = [];

        if (trailConditions.length < 10) errorMess.push = 'Trail Conditions must be more than 10 characters';

        setErrors(errorMess);

        if(errorMess.length === 0){
            const formData = new FormData();
            formData.append("activityType", activityType);
            formData.append("trailConditions", trailConditions);

            await dispatch(activityActions.updateActivity(id, formData))
            closeModal();
            window.location.reload();
        }
    }

    return (
        <div className="edit-activity-container">
            <div><p>Edit your activity</p></div>
            <div className="error-message">{errors && errors.trailConditions && <p className="error-message">{errors.trailConditions}</p>}</div>
            <form onSubmit={handleSubmit}>
                <label>Activity type
                <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
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
                    {/* <input
                        value={activityType}
                        placeholder="Activity Type"
                        onChange={(e) => setActivityType(e.target.value)}
                    /> */}
                </label>
                <label>Trail Conditions
                    <input
                        value={trailConditions}
                        placeholder="Trail Conditions"
                        onChange={(e) => setTrailConditions(e.target.value)}
                    />
                </label>
                <div className='review-submit-button-placement'>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='review-submit-button'
                    >
                        <p className='post-text'>Update Your Activity</p>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default EditActivityModal;
