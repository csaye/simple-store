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
    setFiles(undefined);
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
    setFolders(undefined);
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders').where('path', '==', path);
    await foldersRef.get().then(result => {
      let data = result.docs.map(doc => getDoc(doc));
      data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
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
