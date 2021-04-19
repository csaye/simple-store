import React, { useState } from 'react';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import firebase from 'firebase/app';

import './File.css';

function File(props) {
  const [url, setUrl] = useState(undefined);
  const [fileType, setFileType] = useState(undefined);

  const { name } = props.file;
  const path = props.path;

  async function getFileData() {
    // get download url
    const dUrl = await props.file.getDownloadURL();
    setUrl(dUrl);
    // get file type
    const metadata = await props.file.getMetadata();
    const fType = metadata.contentType;
    setFileType(fType);
  }

  useState(() => {
    // get file data on start
    getFileData();
  }, []);

  async function deleteFile() {
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + path + name);
    await storageRef.delete().then(props.onFileUpdate);
  }

  return (
    <div className="File grid-box">
      <h1><InsertDriveFileIcon /><span className="title-text">{name}</span></h1>
      <p className="subtext">{path + name}</p>
      {
        fileType &&
        <>
          {fileType.startsWith('audio/') && <audio src={url} controls />}
          {fileType.startsWith('image/') && <img src={url} alt={name} />}
          {fileType.startsWith('video/') && <video src={url} controls />}
        </>
      }
      <button
        className="icon-button"
        onClick={() => window.open(url)}
      >
        <OpenInNewIcon />
      </button>
      <button
        className="delete-file icon-button"
        onClick={deleteFile}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default File;
