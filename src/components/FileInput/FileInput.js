import React, { useState } from 'react';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';

import firebase from 'firebase/app';

import Loading from '../Loading/Loading.js';

import './FileInput.css';

function FileInput(props) {
  const [file, setFile] = useState(undefined);
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);

  async function uploadFile(e) {
    e.preventDefault();
    setLoading(true);
    // if no file, return
    if (!file) return;
    // put file in storage
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + props.path + file.name);
    await storageRef.put(file).then(() => {
      props.onFileUpdate();
      setLoading(false);
    });
  }

  async function newFolder(e) {
    e.preventDefault();
    // return if no folder name
    // add new folder in firebase
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders');
    await foldersRef.add({
      name: folderName ? folderName : 'New Folder',
      path: props.path
    }).then(props.onFolderUpdate);
  }

  return (
    <div className="FileInput grid-box">
      <h1>Input</h1>
      <p className="subtext">{props.path}</p>
      {
        props.path !== '/' &&
        <button onClick={props.leaveFolder}>Leave Folder</button>
      }
      <form className="upload-file" onSubmit={uploadFile}>
        <input
          type="file"
          className="file-input"
          onChange={e => setFile(e.target.files[0])}
          />
          {file && <button type="submit"><PublishIcon /></button>}
      </form>
      {loading && <Loading />}
      <form className="new-folder" onSubmit={newFolder}>
        <input
          value={folderName}
          className="folder-input"
          placeholder="New Folder"
          onChange={e => setFolderName(e.target.value)}
        />
        <button type="submit">
          <CreateNewFolderIcon />
        </button>
      </form>
    </div>
  );
}

export default FileInput;
