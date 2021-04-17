import React, { useState } from 'react';

import firebase from 'firebase/app';

import './FileInput.css';

function FileInput(props) {
  const [file, setFile] = useState(undefined);
  const [folderName, setFolderName] = useState('');

  async function uploadFile() {
    // if no file, return
    if (!file) return;
    // put file in storage
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + props.path + file.name);
    await storageRef.put(file).then(props.onFileUpdate);
  }

  async function newFolder(e) {
    e.preventDefault();
    // return if no folder name
    if (!folderName) return;
    // add new folder in firebase
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders');
    await foldersRef.add({
      name: folderName,
      path: props.path
    }).then(props.onFolderUpdate);
  }

  return (
    <div className="FileInput grid-box">
      <h1>Input</h1>
      <p>{props.path}</p>
      {
        props.path !== '/' &&
        <button onClick={props.leaveFolder}>Leave Folder</button>
      }
      <input
        type="file"
        className="file-input"
        onChange={e => setFile(e.target.files[0])}
        />
      {
        file && <button onClick={uploadFile}>Upload File</button>
      }
      <form onSubmit={newFolder}>
        <input
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
          required
        />
        <button type="submit">New Folder</button>
      </form>
    </div>
  );
}

export default FileInput;
