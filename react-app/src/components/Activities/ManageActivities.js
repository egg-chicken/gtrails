import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as activityActions from '../../store/activities';
import { useParams } from "react-router-dom";

const ManageActivitiesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activities = useSelector((state) => Object.values(state.activity));

    useEffect(() => {
        dispatch(activityActions.getCurrentUsersActivities())
    }, [dispatch]);

    if(activities.length === 0) {
        return (
            <div><p>No activities!</p></div>
        )
    }
    return (
        <div className="manage-activities-container">
            <p>Manage Activities</p>
            <div>
            {activities?.map(activity => (
                <div key={activity.id}>
                    <p>{activity.activityType}</p>
                    <p>{activity.trailConditions}</p>
                </div>
            ))}
            </div>
        </div>
    )
};

export default ManageActivitiesPage;
