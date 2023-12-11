import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import * as listActions from '../../store/lists';
import './css/create-new.css'

const EditListModal = ({id}) => {
    const dispatch = useDispatch();
    const listId = useSelector(state => state.list[id]);
    const { closeModal } = useModal();
    const [listName, setListName] = useState(listId?.listName);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(listActions.getListsDetails(id))
    });

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = {};

        if(!listName) errors.listName = 'List Name is required';
        if (listName.length > 15) errors.listName = 'Max 15 characters.';

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            setErrors({});
            const formData = new FormData();
            formData.append("listName", listName);

            dispatch(listActions.updateList(id, formData))
                .then(() => {
                    closeModal();
                })
                .catch((err) => {
                    setErrors(err)
                })
        }
    };

    return (
        <div className="new-create-activity-container">
            <div><p className="list-title">Create a New List</p></div>
            <div className="error-message">{errors && errors.listName && <p className="error-message">{errors.listName}</p>}</div>
            <form onSubmit={handleSubmit} className="list-form" >
                <div className='list-name-container'>
                    <p className='listname-text'>List Name</p>
                    <input
                        type="text"
                        className='listname-input'
                        value={listName}
                        placeholder='Your List Name'
                        onChange={(e) => setListName(e.target.value)}
                    />
                </div>
                <div className="button-activity-align">
                    <button type='submit' className='activity-submit-button'>
                        <p className='post-text'>Done</p>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default EditListModal;
