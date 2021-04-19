import React, { useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Logo from '../Logo/Logo.js';

import firebase from 'firebase/app';

import './Header.css';

function Header() {
  const [userPopup, setUserPopup] = useState(false);

  return (
    <div className="Header">
      <div className="elem-list">
        <Logo />
        <p>
          SimpleStore
          <br/>
          <span className="slogan">File storage simplified.</span>
        </p>
      </div>
      <div className="elem-list">
        <img
          className="photo-url"
          src={firebase.auth().currentUser.photoURL}
          alt="profile"
          onClick={() => setUserPopup(!userPopup)}
        />
      </div>
      {
        userPopup &&
        <div className="user-popup">
          <img
            className="popup-photo-url"
            src={firebase.auth().currentUser.photoURL}
            alt="profile"
          />
          <p>
            {firebase.auth().currentUser.displayName}
            <br />
            <span className="subtext">{firebase.auth().currentUser.email}</span>
          </p>
          <button
            className="sign-out icon-button"
            onClick={() => firebase.auth().signOut()}
          >
            <ExitToAppIcon />
          </button>
        </div>
      }
    </div>
  );
}

export default Header;
