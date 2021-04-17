import FileInput from '../FileInput/FileInput.js';
import File from '../File/File.js';
import Folder from '../Folder/Folder.js';

import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';

import './FileDisplay.css';

function FileDisplay() {
  const [files, setFiles] = useState(undefined);
  const [folders, setFolders] = useState(undefined);
  const [path, setPath] = useState('/');

  // gets all files from storage
  async function getFiles() {
    const uid = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(uid + path);
    await storageRef.listAll().then(result => {
      setFiles(result.items);
    });
  }

  // returns doc object for given doc
  function getDoc(doc) {
    const id = doc.id;
    const data = doc.data();
    return {id, ...data};
  }

  // gets all folders from firestore
  async function getFolders() {
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders').where('path', '==', path);
    await foldersRef.get().then(result => {
      const data = result.docs.map(doc => getDoc(doc));
      setFolders(data);
    });
  }

  // leaves current folder
  function leaveFolder() {
    const slashIndex = path.slice(0, path.length - 1).lastIndexOf('/');
    const newPath = path.slice(0, slashIndex + 1);
    setPath(newPath);
  }

  useEffect(() => {
    // get files and folders on start or path change
    getFiles();
    getFolders();
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="FileDisplay">
      <FileInput
        path={path}
        leaveFolder={leaveFolder}
        onFileUpdate={getFiles}
        onFolderUpdate={getFolders}
      />
      {
        files && files.map((f, i) =>
          <File
            key={`file-${i}`}
            file={f}
            path={path}
            onFileUpdate={getFiles}
          />
        )
      }
      {
        folders && folders.map((f, i) =>
          <Folder
            key={`folder-${i}`}
            folder={f}
            setPath={setPath}
            onFolderUpdate={getFolders}
          />
        )
      }
    </div>
  );
}

export default FileDisplay;
