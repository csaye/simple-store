import React, { useEffect, useState } from 'react';

import LoopIcon from '@material-ui/icons/Loop';
import CachedIcon from '@material-ui/icons/Cached';

import './Loading.css';

function Loading() {
  const [altIcon, setAltIcon] = useState(false);

  useEffect(() => {
    let alt = false;
    const loadInterval = setInterval(() => {
      alt = !alt;
      setAltIcon(alt);
    }, 200);
    return () => clearInterval(loadInterval);
  });

  return (
    <div className="Loading">
      {altIcon ? <CachedIcon /> : <LoopIcon />}
    </div>
  );
}

export default Loading;
