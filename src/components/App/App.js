import Header from '../Header/Header.js';
import FileDisplay from '../FileDisplay/FileDisplay.js';
import SignIn from '../SignIn/SignIn.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';

firebase.initializeApp(firebaseConfig);

function App() {
  useAuthState(firebase.auth());

  return (
    <div className="App">
      {
        firebase.auth().currentUser ?
        <>
          <Header />
          <FileDisplay />
        </> :
        <SignIn />
      }
    </div>
  );
}

export default App;
