import firebase from 'firebase/app';

import './Folder.css';

function Folder(props) {
  const { name, path, id } = props.folder;

  // recursively deletes contents of folder
  async function deleteFolderContents(path) {
    const storageRef = firebase.storage().ref(path);
    await storageRef.listAll().then(result => {
      result.items.forEach(file => {
        const fileRef = firebase.storage().ref(file.fullPath);
        fileRef.delete();
      });
      result.prefixes.forEach(folder => {
        deleteFolderContents(folder.fullPath);
      });
    })
  }

  async function deleteFolder() {
    // delete folder document from firebase
    const uid = firebase.auth().currentUser.uid;
    const foldersRef = firebase.firestore().collection('users').doc(uid).collection('folders');
    const folderRef = foldersRef.doc(id);
    // delete folder in firebase
    await folderRef.delete().then(props.onFolderUpdate);
    // delete subfolders in firebase
    await foldersRef.get().then(result => {
      result.forEach(folder => {
        if (folder.data().path.startsWith(path + name + '/')) {
          folder.ref.delete();
        }
      });
    });
    // delete folder from storage
    deleteFolderContents(uid + path + name);
  }

  return (
    <div className="Folder grid-box">
      <h1>Folder</h1>
      <p>{name}</p>
      <p className="subtext">{path + name + '/'}</p>
      <button
        onClick={() => props.setPath(path + name + '/')}
      >
        Enter Folder
      </button>
      <button onClick={deleteFolder}>Delete Folder</button>
    </div>
  );
}

export default Folder;
