import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as locationsActions from "../../store/locations";

function DeleteModal({id}) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(locationsActions.deleteLocation(id))
            .then(closeModal)
    };

    return (
        <div className="delete-modal-container">
            <div className="login-form">
                <p className="delete-title-text">Delete Location?</p>
                <p className="confirmation-delete">Deleting a location will erase it permanently</p>
                <form className='delete-buttons' onSubmit={handleSubmit}>
                    <button className='yes-delete-review' type='submit'>Delete</button>
                    <button className='keep-review' onClick={closeModal}>Keep</button>
                </form>
            </div>
        </div>
        )
    }

export default DeleteModal;
