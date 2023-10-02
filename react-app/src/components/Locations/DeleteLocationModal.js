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
        <>
        <div className="login-form">
            <h2 className="login-text">Confirm Delete</h2>
            <p>Are your sure you want to remove this location from the listings?</p>
            <form className='form-delete'onSubmit={handleSubmit}>
                <button className='create-button' type='submit'>Yes (Delete Location)</button>
                <button className='keep-button delete-style' onClick={closeModal}>No (Keep Location)</button>
            </form>
        </div>
        </>
    )
    }

export default DeleteModal;
