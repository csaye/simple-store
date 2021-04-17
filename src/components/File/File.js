import React, { useState } from 'react';

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
      <h1>File</h1>
      <p><a href={url} target="_blank" rel="noreferrer">{name}</a> ({fileType})</p>
      {
        fileType &&
        <>
          {fileType.startsWith('audio/') && <audio src={url} controls />}
          {fileType.startsWith('image/') && <img src={url} alt={name} />}
          {fileType.startsWith('video/') && <video src={url} controls />}
        </>
      }
      <button className="delete-file" onClick={deleteFile}>Delete</button>
    </div>
  );
}

export default File;
