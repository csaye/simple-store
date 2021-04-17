import React, { useState } from 'react';

import firebase from 'firebase/app';

import './Header.css';
import logo from '../../img/logo.png';
import logo2 from '../../img/logo2.png';

function Header() {
  const [userPopup, setUserPopup] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logo);

  return (
    <div className="Header">
      <div className="elem-list">
        <img
          className="logo"
          src={logoSrc}
          alt="logo"
          onMouseEnter={() => setLogoSrc(logo2)}
          onMouseLeave={() => setLogoSrc(logo)}
          />
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
            className="sign-out"
            onClick={() => firebase.auth().signOut()}
          >
            Sign Out
          </button>
        </div>
      }
    </div>
  );
}

export default Header;
