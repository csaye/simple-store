import FileInput from '../FileInput/FileInput.js';
import File from '../File/File.js';

import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';

import './FileDisplay.css';

function FileDisplay() {
  const [files, setFiles] = useState(undefined);

  async function getFilesFromStorage() {
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid);
    await storageRef.listAll().then(result => {
      setFiles(result.items);
    });
  }

  useEffect(() => {
    getFilesFromStorage();
  }, []);

  return (
    <div className="FileDisplay">
      <FileInput onUpdate={getFilesFromStorage} />
      {
        files && files.map((f, i) =>
        <File
          key={`file-${i}`}
          file={f}
          onUpdate={getFilesFromStorage}
        />
        )
      }
    </div>
  );
}

export default FileDisplay;
