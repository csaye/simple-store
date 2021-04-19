import Logo from '../Logo/Logo.js';

import firebase from 'firebase/app';

import './SignIn.css';

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className="SignIn">
      <div className="center-box">
        <Logo />
        <h1>SimpleStore</h1>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
