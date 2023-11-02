const LOAD_ALL_ACTIVITIES = 'activitys/LOAD_ACTIVITIES';
const LOAD_ONE_ACTIVITY = 'activitys/LOAD_ONE_ACTIVITY';
const LOAD_USER_ACTIVITIES = 'activitys/LOAD_USER_ACTIVITIES';
const UPDATE_ACTIVITY = 'activitys/UPDATE_ACTIVITY';
const DELETE_ACTIVITY = 'activitys/DELETE';
const CREATE_ACTIVITY = 'activitys/CREATE';

const loadActivities = activities => ({
    type: LOAD_ALL_ACTIVITIES,
    activities
});

const loadActivity = activity => ({
    type: LOAD_ONE_ACTIVITY,
    activity
});

const loadUserActivities = activities => ({
    type: LOAD_USER_ACTIVITIES,
    activities
});

const createOne = activity => ({
    type: CREATE_ACTIVITY,
    activity
});

const deleteOne = id => ({
    type: DELETE_ACTIVITY,
    id
});

const updateOne = activity => ({
    type: UPDATE_ACTIVITY,
    activity
});

// get all the activities locations
export const getAllActivities = id => async dispatch => {
    const response = await fetch(`/api/locations/${id}/activities`)

    if(response.ok){
        const activities = await response.json();
        dispatch(loadActivities(activities));
        return activities;
    }
}


// get all activities
export const getActivities = () => async dispatch => {
    const res = await fetch('/api/activities');

    if (res.ok){
        const activities = await res.json();
        dispatch(loadActivities(activities));
        return activities;
    }
};

// get all the current user's activities
export const getCurrentUsersActivities = () => async dispatch => {
    const res = await fetch('/api/activities/created');

    if (res.ok){
        const activities = await res.json();
        dispatch(loadUserActivities(activities));
        return activities;
    }
};

// get activities details
export const getActivitiesDetails = (id) => async dispatch => {
    const res = await fetch(`/api/activities/${id}`);

    if (res.ok){
        const activity = await res.json();
        dispatch(loadActivity(activity));
        return activity;
    }
};

// create an activity
export const createActivity = (id, activityData) => async dispatch => {
    const res = await fetch('/api/activities/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activityData)
    });

    if (res.ok) {
        const activity = await res.json();
        dispatch(createOne(activity));
        return
    }
    return await res.json()
};

// delete an activity
export const deleteActivity = (id) => async dispatch => {
    const res = await fetch(`/api/activities/${id}/del`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const ress = await res.json();
        dispatch(deleteOne(id));
        console.log('sdfds', res)
        return ress;
    }
;}

// update an activity
export const updateActivity = (id, formData) => async dispatch => {
    const res = await fetch(`/api/activities/${id}/edit`, {
        method: 'PUT',
        body: formData
    });

    if (res.ok) {
        const update = await res.json();
        dispatch(updateOne(update));
        return update;
    }
};

const initialState = {};

const activityReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_ALL_ACTIVITIES:
            const allActivities = {};
            action.activities.activities.forEach(element => {
                allActivities[element.id] = element;
            });
            return { ...allActivities};
        case LOAD_USER_ACTIVITIES:
            const user = {};
            action.activities.activities.forEach((element) => {
                user[element.id] = element;
            });
            return user;
        case LOAD_ONE_ACTIVITY:
            newState[action.activity.id] = {...newState[action.activity.id], ...action.activity};
            return newState
        case CREATE_ACTIVITY:
            if (action.activity && action.activity.id) {
                newState[action.activity.id] = action.activity;
            }
            return newState
        case UPDATE_ACTIVITY:
            newState[action.activity.id] = action.activity;
            return newState
        case DELETE_ACTIVITY:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
}

export default activityReducer;
