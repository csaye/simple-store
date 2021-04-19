import React, { useState } from 'react';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';
import BackupIcon from '@material-ui/icons/Backup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import firebase from 'firebase/app';

import Loading from '../Loading/Loading.js';

import './FileInput.css';

function FileInput(props) {
  const [file, setFile] = useState(undefined);
  const [folderName, setFolderName] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const [folderLoading, setFolderLoading] = useState(false);

  async function uploadFile(e) {
    e.preventDefault();
    setFileLoading(true);
    // if no file, return
    if (!file) return;
    // put file in storage
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + props.path + file.name);
    await storageRef.put(file).then(() => {
      props.onFileUpdate();
      setFileLoading(false);
    });
  }

  async function newFolder(e) {
    e.preventDefault();
    setFolderLoading(true);
    // add new folder in firebase
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders');
    await foldersRef.add({
      name: folderName ? folderName : 'New Folder',
      path: props.path
    }).then(() => {
      props.onFolderUpdate();
      setFolderLoading(false);
    });
  }

  return (
    <div className="FileInput grid-box">
      <h1><BackupIcon /><span className="title-text">Input</span></h1>
      <p className="subtext">{props.path}</p>
      {
        props.path !== '/' &&
        <button className="icon-button" onClick={props.leaveFolder}>
          <ArrowBackIcon />
        </button>
      }
      <form className="upload-file" onSubmit={uploadFile}>
        <input
          type="file"
          className="file-input"
          onChange={e => setFile(e.target.files[0])}
          />
          {
            (file && !fileLoading) &&
            <button
              className="icon-button"
              type="submit"
            >
              <PublishIcon />
            </button>
          }
          {
            fileLoading && <button className="icon-button"><Loading /></button>
          }
      </form>
      <form className="new-folder" onSubmit={newFolder}>
        <input
          value={folderName}
          className="folder-input"
          placeholder="New Folder"
          onChange={e => setFolderName(e.target.value)}
        />
        {
          folderLoading ?
          <button className="icon-button"><Loading /></button> :
          <button className="icon-button" type="submit">
            <CreateNewFolderIcon />
          </button>
        }
      </form>
    </div>
  );
}

export default FileInput;
