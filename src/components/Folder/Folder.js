import firebase from 'firebase/app';

import './Folder.css';

function Folder(props) {
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
    </div>
  );
}

export default Folder;
