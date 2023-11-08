import React from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as listActions from "../../store/lists";
// import './css/delete-modal.css'

function DeleteLocationFromListModal ({listId, locationId}) {
    const { closeModal } = useModal();
    // const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(listActions.removeLocationfromList(listId, locationId))
        .then(closeModal)
        window.location.reload()
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-form">
                <p className="delete-title-text">Delete List?</p>
                <p className="confirmation-delete">Deleting a list will erase it permanently</p>
                <form className='delete-buttons' onSubmit={handleSubmit}>
                    <button className='yes-delete-list' type='submit'>Delete</button>
                    <button className='keep-list' onClick={closeModal}>Keep</button>
                </form>
            </div>
        </div>


    )
}

export default DeleteLocationFromListModal;
