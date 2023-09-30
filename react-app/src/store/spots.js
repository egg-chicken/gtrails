const LOAD_ALL_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE';
const CREATE_SPOT = 'spots/CREATE';

const loadspots = list => ({
    type: LOAD_ALL_SPOTS,
    list
})

const loadspot = spot => ({
    type: LOAD_ONE_SPOT,
    spot
})

const loadUserSpots = spots => ({
    type: LOAD_USER_SPOTS,
    spots
})

const createOne = spot => ({
    type: CREATE_SPOT,
    spot
});

const deleteOne = id => ({
    type: DELETE_SPOT,
    id
});

const updateOne = spot => ({
    type: UPDATE_SPOT,
    spot
});

// get the list of all spots
export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if(response.ok) {
        const list = await response.json();
        dispatch(loadspots(list));
        return list;
    }
}

// get all the current user's spots
export const getCurrentUsersSpots = () => async dispatch => {
    const response = await fetch('/api/spots/created');

    if(response.ok){
        const spots = await response.json();
        dispatch(loadUserSpots(spots));
        return spots
    }
}

// get a spot's details
export const getSpotsDetails = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if(response.ok){
        const spot = await response.json();
        dispatch(loadspot(spot));
        return spot
    }
}

// create a spot
export const createSpot = (spot) => async (dispatch) => {
    const response = await fetch('/api/spots/new', {
        method: "POST",
        body: spot
      });

      if (response.ok) {
          const resPost  = await response.json();
          dispatch(createOne(resPost));
      } else {
          console.log("There was an error making your post!")
      }
};

// delete a spot
export const deleteSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/del`, {
        method: 'DELETE'
    });

    if(response.ok){
       return dispatch(deleteOne(id));
    }
}

export const updateSpot = (id, formData) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/edit`, {
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

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            const allSpots = {};
            action.list.spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            return {
                ...allSpots
            }
        case LOAD_USER_SPOTS:
            const user = {};
            action.spots.spots.forEach((spot) => {
                user[spot.id] = spot;
            })
            return user;
        case LOAD_ONE_SPOT:
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot};
            return newState
        case CREATE_SPOT:
            if (action.spot && action.spot.id) {
                newState[action.spot.id] = action.spot;
            }
            return newState
        case UPDATE_SPOT:
            newState[action.spot.id] = action.spot;
            return newState
        case DELETE_SPOT:
            delete newState[action.id];
            return newState;
        default:
            return newState;
    }
}

export default spotsReducer;
