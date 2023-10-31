import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as activityActions from '../../store/activities';
import { useParams } from "react-router-dom";
import EditActivityModal from "./EditActivityModal";
import DeleteActivityModal from "./DeleteActivityModal";
import OpenModalButton from '../OpenModalButton';
import './css/manage-activities.css'

const ManageActivitiesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activities = useSelector((state) => Object.values(state.activity));

    useEffect(() => {
        dispatch(activityActions.getCurrentUsersActivities())
    }, [dispatch]);

    if(activities.length === 0) {
        return (
            <div className="manage-activities-container">
                <p>No activities completed. Find a location and complete an activity</p>
            </div>
        )
    }
    return (
        <div className="manage-activities-container">
            <div className="location-border-card">
                <p className="review-title activity-header">Manage Activities</p>
                <div className="user-activities">
                {activities?.map(activity => (
                    <div className='' key={activity.id}>
                        <p>{activity.activityType}</p>
                        <p>{activity.trailConditions}</p>
                        <OpenModalButton
                                modalComponent={<DeleteActivityModal id={activity.id}/>}
                                buttonText='Delete'
                                buttonType="Delete"
                        />&#124;
                        <OpenModalButton
                            modalComponent={<EditActivityModal id={activity.id}/>}
                            buttonText='Edit'
                            buttonType="edit"
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};

export default ManageActivitiesPage;
