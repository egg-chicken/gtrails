const LOAD_ALL_LOCATIONS = 'locations/LOAD_LOCATIONS';
const LOAD_ONE_LOCATION = 'locations/LOAD_ONE_LOCATION';
const LOAD_USER_LOCATIONS = 'locations/LOAD_USER_LOCATIONS';
const UPDATE_LOCATION = 'locations/UPDATE_LOCATION';
const DELETE_LOCATION = 'locations/DELETE';
const CREATE_LOCATION = 'locations/CREATE';

const loadlocations = list => ({
    type: LOAD_ALL_LOCATIONS,
    list
})

const loadlocation = location => ({
    type: LOAD_ONE_LOCATION,
    location
})

const loadUserLocations = locations => ({
    type: LOAD_USER_LOCATIONS,
    locations
})

const createOne = location => ({
    type: CREATE_LOCATION,
    location
});

const deleteOne = id => ({
    type: DELETE_LOCATION,
    id
});

const updateOne = location => ({
    type: UPDATE_LOCATION,
    location
});

// get the list of all locations
export const getLocations = () => async dispatch => {
    const response = await fetch('/api/locations');

    if(response.ok) {
        const list = await response.json();
        dispatch(loadlocations(list));
        return list;
    }
}

// get all the current user's locations
export const getCurrentUsersLocations = () => async dispatch => {
    const response = await fetch('/api/locations/created');

    if(response.ok){
        const locations = await response.json();
        dispatch(loadUserLocations(locations));
        return locations
    }
}

// get a location's details
export const getLocationsDetails = (id) => async dispatch => {
    const response = await fetch(`/api/locations/${id}`);

    if(response.ok){
        const location = await response.json();
        dispatch(loadlocation(location));
        return location
    }
}

// create a location
export const createLocation = (location) => async (dispatch) => {
    const response = await fetch('/api/locations/new', {
        method: "POST",
        body: location
      });

      if (response.ok) {
          const resPost  = await response.json();
          dispatch(createOne(resPost));
      }
};

// delete a location
export const deleteLocation = (id) => async dispatch => {
    const response = await fetch(`/api/locations/${id}/del`, {
        method: 'DELETE'
    });

    if(response.ok){
       return dispatch(deleteOne(id));
    }
}

export const updateLocation = (id, formData) => async dispatch => {
    const response = await fetch(`/api/locations/${id}/edit`, {
        method: 'PUT',
        body: formData
    });

    if(response.ok) {
        const updated = await response.json();
        dispatch(updateOne(updated));
        return updated;
    }
};

const initialState = {};

const locationsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_ALL_LOCATIONS:
            const allLocations = {};
            action.list.locations.forEach((location) => {
                allLocations[location.id] = location;
            });
            return {
                ...allLocations
            }
        case LOAD_USER_LOCATIONS:
            const user = {};
            action.locations.locations.forEach((location) => {
                user[location.id] = location;
            })
            return user;
        case LOAD_ONE_LOCATION:
            newState[action.location.id] = {...newState[action.location.id], ...action.location};
            return newState
        case CREATE_LOCATION:
            if (action.location && action.location.id) {
                newState[action.location.id] = action.location;
            }
            return newState
        case UPDATE_LOCATION:
            newState[action.location.id] = action.location;
            return newState
        case DELETE_LOCATION:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
}

export default locationsReducer;
