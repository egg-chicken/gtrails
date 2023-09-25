import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './mainpage.css'

const LandingPage = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="main-bar">
                <h1 className="main-title">Find your outdoors</h1>
                <NavLink exact to="/explore">Explore nearby trails</NavLink>
            </div>
            <div>
                <h1>Let's find a new trail, add user name</h1>
                <h2>Parks worth a look</h2>
                <h2>Cities to explore</h2>
                <h2>Countries to consider</h2>
                <h2>Browse by activity</h2>
                <h3>Share your next adventure! by tagging me :) </h3>
            </div>
        </>
    )
}

export default LandingPage
