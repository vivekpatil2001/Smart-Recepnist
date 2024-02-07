import React from 'react';
import { Link } from "react-router-dom";
import './Button.css';


function Button() {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ margin: '0 10px' }}>
        <Link to="/missingPerson" className='person-links bg-pink-600'>Missing Person</Link>
      </div>
      <div style={{ margin: '0 10px' }}>
        <Link to="/criminalForm" className='person-links bg-pink-600'>Criminal Form</Link>
      </div>
    </div>
    </>
  );
}

export default Button;
