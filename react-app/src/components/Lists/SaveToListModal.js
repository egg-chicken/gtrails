import React, { useEffect, useState } from "react";
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from '../../store/lists';
import './css/savetolist.css';

const SaveToModal = ({locationId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const lists = useSelector((state) => Object.values(state.list));
    const [listId, setListId] = useState("");

    useEffect(() => {
        dispatch(listActions.getCurrentUsersLists())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(listId === 'Please select a list below') return
        await dispatch(listActions.addLocationsToListThunk(listId, locationId))
        closeModal();
        history.push(`/lists/${listId}`);
    };

    return (
        <div className="create-activity-container">
            <div><p className="act-title">Save to list</p></div>
            <select
                className="select-list"
                value={listId}
                onChange={(e) => setListId(e.target.value)}
                required
            >
                <option >Please select a list below</option>
                {lists?.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.listName}
                    </option>
                ))}
            </select>
            <div className="button-activity-align">
            <button onClick={handleSubmit} className='activity-submit-button'>
                <p className='post-text'>Done</p>
            </button></div>
        </div>
    )
};

export default SaveToModal;
