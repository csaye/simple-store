import React, { useState } from 'react';

import firebase from 'firebase/app';

import './File.css';

function File(props) {
  const [url, setUrl] = useState(undefined);

  const { name } = props.file;

  async function getDownloadURL() {
    const dUrl = await props.file.getDownloadURL();
    setUrl(dUrl);
  }

  useState(() => {
    getDownloadURL();
  }, []);

  async function deleteFile() {
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + '/' + name);
    await storageRef.delete().then(props.onUpdate);
  }

  return (
    <div className="File grid-box">
      <a href={url} target="_blank" rel="noreferrer">{name}</a>
      <button onClick={deleteFile}>Delete</button>
    </div>
  );
}

export default File;
