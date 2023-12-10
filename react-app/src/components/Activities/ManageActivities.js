import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as activityActions from '../../store/activities';
import { useParams, Link } from "react-router-dom";
import EditActivityModal from "./EditActivityModal";
import DeleteActivityModal from "./DeleteActivityModal";
import OpenModalButton from '../OpenModalButton';
import './css/manage-activities.css'

const ManageActivitiesPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const activities = useSelector((state) => Object.values(state.activity));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        dispatch(activityActions.getCurrentUsersActivities())
    }, [dispatch, id]);

    if(activities.length === 0) {
        return (
            <div className="manage-review-container">
                <p>No activities completed. Find a location and complete an activity</p>
            </div>
        )
    }
    return (
        <div className="manage-review-container">
            <div className="location-border-card">
                <p className="review-title manage-review">Manage Activities</p>
                <div className="all-user-reviews">
                {activities?.map(activity => {
                    const activityMonth = months[new Date(activity.createdAt).getMonth()];
                    const day = (new Date(activity.createdAt).getDate()) + 1;
                    const year = new Date(activity.createdAt).getFullYear();

                    return (
                    <div className='each-review' key={activity.id}>
                        <div className="review-detials">
                            <div className='username-date'>
                                <p className='date'>{activityMonth} {day}, {year}</p>
                            </div>
                            <p className='activity-text'><span className='type-text'>Location: </span>{activity.locationName}</p>
                            <p className='activity-text'><span className='type-text'>Type: </span>{activity.activityType}</p>
                            <p className='review-text'><span className='type-text'>Trail Conditions: </span>{activity.trailConditions}</p>
                        </div>
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
                    )
                    })}
                </div>
            </div>
        </div>
    )
};

export default ManageActivitiesPage;
