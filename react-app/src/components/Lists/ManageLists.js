import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "./CreateNewListModal";
import * as listActions from '../../store/lists';
import './css/manage-lists.css'

const ManageListPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const lists = useSelector((state) => Object.values(state.list))

    console.log('lists', lists)
    useEffect(() => {
        dispatch(listActions.getCurrentUsersLists())
    }, [dispatch]);

    return (
        <div className="list-container">
            <div className='location-border-card'>
            <p className='review-title manage-review'>Lists</p>
            <OpenModalButton
                modalComponent={<CreateListModal />}
                buttonText={<><i class="fas fa-plus"></i>
                            <span>Create a New List</span></>}
                buttonType='createlist'
            />
            <div >
                {lists?.map(list => (
                    <div className='each-list' key={list.id}>
                        <Link className='review-link-location' to={`/lists/${list.id}`}>
                            <i className="fas fa-list review-location-name"></i>
                            <span className='review-location-name'>  {list.listName}</span>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
};

export default ManageListPage;
