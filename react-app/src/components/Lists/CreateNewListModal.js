import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import './css/create-new.css'

const CreateListModal = () => {
    const { closeModal } = useModal();
    const [listName, setListName] = useState("");

    useEffect(() => {

    });

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <div className="new-create-activity-container">
            <div><p className="list-title">Create a New List</p></div>
            <form onClick={handleSubmit} className="list-form" >
                <div className='review-rating-container'>
                        <p className='listname-text'>List Name</p>
                        <input
                            className='listname-input'
                            value={listName}
                            placeholder='Your List Name'
                            onChange={(e) => setListName(e.target.value)}
                        />
                </div>
            </form>
            <div className="button-activity-align">
            <button onClick={handleSubmit} className='activity-submit-button'>
                <p className='post-text'>Done</p>
            </button>
            </div>
        </div>
    )
};

export default CreateListModal;
