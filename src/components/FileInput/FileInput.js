import React, { useState } from 'react';

import firebase from 'firebase/app';

import './FileInput.css';

function FileInput(props) {
  const [file, setFile] = useState(undefined);

  async function uploadFile() {
    // if no file, return
    console.log(file);
    if (!file) return;
    // put file in storage
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + '/' + file.name);
    await storageRef.put(file).then(props.onUpdate);
  }

  return (
    <div className="FileInput grid-box">
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        />
      {
        file && <button onClick={uploadFile}>Upload File</button>
      }
    </div>
  );
}

export default FileInput;
