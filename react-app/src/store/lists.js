const LOAD_ALL_LISTS = 'lists/LOAD_ALL_LISTS';
const LOAD_ONE_LIST = 'lists/LOAD_ONE_LIST'
const LOAD_USER_LISTS = 'lists/LOAD_USER_LISTS';
const ADD_LOCATIONS_TO_LIST = "lists/addLocationsToList";
const UPDATE_LIST = 'lists/UPDATE_LIST';
const CREATE_LIST = 'lists/CREATE_LIST';
const DELETE_LIST = 'lists/DELETE_LIST';

const loadLists = lists => ({
    type: LOAD_ALL_LISTS,
    lists
});

const loadList = list => ({
    type: LOAD_ONE_LIST,
    list
});

const loadUserLists = lists => ({
    type: LOAD_USER_LISTS,
    lists
});

const createOne = list => ({
    type: CREATE_LIST,
    list
});

const deleteOne = id => ({
    type: DELETE_LIST,
    id
});

const updateOne = list => ({
    type: UPDATE_LIST,
    list
});

const addLocationsToListAction = (listId, locationId) => {
    return {
      type: ADD_LOCATIONS_TO_LIST,
      payload: { listId, locationId },
    };
};

// get all lists
// export const getLists = () => async dispatch => {
//     const res = await fetch('/api/lists');

//     if (res.ok){
//         const lists = await res.json();
//         dispatch(loadLists(lists));
//         return lists;
//     }
// };

// get all the current user's lists
export const getCurrentUsersLists = () => async dispatch => {
    const res = await fetch('/api/lists/created');

    if (res.ok){
        const lists = await res.json();
        dispatch(loadUserLists(lists));
        return lists;
    }
};

// get lists details
export const getListsDetails = (id) => async dispatch => {
    const res = await fetch(`/api/lists/${id}`);

    if (res.ok){
        const list = await res.json();
        dispatch(loadList(list));
        return list;
    }
};

// create an list
export const createList = (list) => async dispatch => {
    const res = await fetch('/api/lists/new', {
        method: 'POST',
        body: list
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(createOne(list));
    }
};

// delete an list
export const deleteList = (id) => async dispatch => {
    const res = await fetch(`/api/lists/${id}/del`, {
        method: 'DELETE'
    });

    if (res.ok) return dispatch(deleteOne(id))
};

// update an list
export const updateList = (id, list) => async dispatch => {
    const res = await fetch(`/api/lists/${id}/edit`, {
        method: 'PUT',
        body: list
    });

    if (res.ok) {
        const update = await res.json();
        dispatch(updateOne(update));
        return update;
    }
};

// Add Location to List
export const addLocationsToListThunk = (listId, locationId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/locations/${locationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    }
    );

    if (response.ok) {
      const addLocationsToList = await response.json();
      dispatch(addLocationsToListAction(listId, locationId));
      return addLocationsToList
    }
};

const initialState = {};

const listReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_ALL_LISTS:
            const allLists = {};
            action.lists.lists.forEach(element => {
                allLists[element.id] = element;
            });
            return { ...allLists};
        case LOAD_USER_LISTS:
            const user = {};
            action.lists.lists.forEach((element) => {
                user[element.id] = element;
            });
            return user;
        case LOAD_ONE_LIST:
            newState[action.list.id] = {...newState[action.list.id], ...action.list};
            return newState
        case CREATE_LIST:
            if (action.list && action.list.id) {
                newState[action.list.id] = action.list;
            }
            return newState
        case UPDATE_LIST:
            newState[action.list.id] = action.list;
            return newState
        case DELETE_LIST:
            delete newState[action.id];
            return newState;
        case ADD_LOCATIONS_TO_LIST:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return newState;
    }
}

export default listReducer;
