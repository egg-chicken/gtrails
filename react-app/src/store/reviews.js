const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadreviews = reviews => ({
    type: LOAD_ALL_REVIEWS,
    reviews
});

const createOne = review => ({
    type:  CREATE_REVIEW,
    review
});

const deleteOne = id => ({
    type: DELETE_REVIEW,
    id
})

// get all the spot reviews
export const getAllReviews = id => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const reviews = await response.json();
        dispatch(loadreviews(reviews));
        return reviews;
    }
}

// create a review
export const createReview = (spotId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
    });

    if (response.ok) {
    const review = await response.json();
    dispatch(createOne(review));
    return review;
    }
  };

//delete a review using id
export const deleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){
        const res = await response.json();
        dispatch(deleteOne(id));
        return res;
    }
};

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
            const mapRev = {}
            action.reviews.Reviews.forEach(review => {
                mapRev[review.id] = review;
            });
            return mapRev;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.id];
            return newState
        default:
            return newState;
    }
}

export default reviewsReducer;
