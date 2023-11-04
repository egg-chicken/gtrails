import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as listActions from "../../store/lists";
// import './css/delete-modal.css'

function DeleteListModal ({id}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(listActions.deleteList(id))
            .then(closeModal)
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

export default DeleteListModal;
