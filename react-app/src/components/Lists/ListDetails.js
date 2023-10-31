import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import * as listActions from '../../store/lists';
import './css/list-details.css'

const ListDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const list  = useSelector((state) => state.list[id])

    useEffect(() => {
        dispatch(listActions.getListsDetails(id))
    }, [dispatch, id]);

    return (
        <div className="list-detail-container">
            <h1>{list?.listName}</h1>
            <p>Explore {list?.listName} - view hand-curated trail maps as well as detailed reviews and photos from hikers, campers and nature lovers like you</p>
            {list?.locations?.map((location, index) => (
                <div key={index}>
                    <Link to={`/locations/${location.id}`}>
                        <p>{location.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    )

}

export default ListDetailPage;
