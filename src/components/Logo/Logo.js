import React, { useState } from 'react';

import './Logo.css';
import logo from '../../img/logo.png';
import logo2 from '../../img/logo2.png';

function Logo() {
  const [logoSrc, setLogoSrc] = useState(logo);

  return (
    <img
      className="Logo"
      src={logoSrc}
      alt="logo"
      onMouseEnter={() => setLogoSrc(logo2)}
      onMouseLeave={() => setLogoSrc(logo)}
    />
  );
}

export default Logo;
