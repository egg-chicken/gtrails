import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as listActions from "../../store/lists";
import './css/delete-list.css';

function DeleteLocationFromListModal ({listId, locationId}) {
    const { closeModal } = useModal();
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
                <p className="d-list-title">Remove from your list?</p>
                <form className='delete-buttons' onSubmit={handleSubmit}>
                    <button className='yes-delete-list' type='submit'>Remove</button>
                    <button className='keep-list' onClick={closeModal}>Keep in my list</button>
                </form>
            </div>
        </div>


    )
}

export default DeleteLocationFromListModal;
