import React, { useEffect, useState } from "react";
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as listActions from '../../store/lists';

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
        <div className="create-review-container">
            <div><p className="review-title">Save to list</p></div>
            <select
                value={listId}
                onChange={(e) => setListId(e.target.value)}
                required
            >
                <option>Please select a list below</option>
                {lists?.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.listName}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit}>Done</button>
        </div>
    )
};

export default SaveToModal;
