import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button className='open-menu-button' onClick={openMenu}>
        <i className="fas fa-solid fa-tree" style={{color:'#25d066',}}></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
              <div className="user-drop">
                <li>Welcome, {user.username}</li>
                <li>{user.email}</li>
              </div>
              <div>
                <li className="drop-link"><NavLink to='/locations/new' className='new-locations-link' onClick={closeMenu}>Add a New Location</NavLink></li>
                <li className="drop-link"><NavLink to='/locations/created' className='manage-locations-link' onClick={closeMenu}>Manage Locations</NavLink></li>
                <li className="drop-link"><NavLink to='/reviews/created' className='reviews-link' onClick={closeMenu}>Reviews</NavLink></li>
                <li className="drop-link"><NavLink to='/activities/created' className='reviews-link' onClick={closeMenu}>Activities</NavLink></li>
                <li className="drop-link"><NavLink to='/lists/created' className='reviews-link' onClick={closeMenu}>Lists</NavLink></li>
              </div>
              <li className="drop-link">
                <button className='log-out-button' onClick={handleLogout}>Log Out</button>
              </li>
          </>
        ) : (
          <>
            <div className="login-button-container">
            <OpenModalButton
              buttonText="Log In"
              buttonType="LogIn"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>
            <OpenModalButton
              buttonText="Sign Up"
              buttonType="SignUp"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
