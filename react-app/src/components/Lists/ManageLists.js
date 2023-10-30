import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
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
            <p>Lists</p>
            <button>Create a New List</button>
            <div>
                {lists?.map(list => (
                    <div key={list.id}>
                        <Link to={`/lists/${id}`}>
                            <p>{list.listName}</p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
};

export default ManageListPage;
