import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as activityActions from "../../store/activities";
// import './css/delete-modal.css'

function DeleteActivityModal ({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(activityActions.deleteActivity(id))
            .then(closeModal)
    };

    return (
        <div className="delete-modal-container">
            <div className="delete-form">
                <p className="delete-title-text">Delete Activity?</p>
                <p className="confirmation-delete">Deleting an activity will erase it permanently</p>
                <form className='delete-buttons' onSubmit={handleSubmit}>
                    <button className='yes-delete-review' type='submit'>Delete</button>
                    <button className='keep-review' onClick={closeModal}>Keep</button>
                </form>
            </div>
        </div>


    )
}

export default DeleteActivityModal;
