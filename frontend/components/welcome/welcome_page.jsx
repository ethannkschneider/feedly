import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = (props) => {

  return (
    <div>
      <h1>Welcome to Readly</h1>
      <p>
        Inifinite content = infinitely content
      </p>

      <div>
        <h3><Link
          onClick={props.openModal}
          to="/welcome/signup">Sign Up
        </Link></h3>
      </div>

      <div id="color-feed-image"></div>
    </div>
  );
};

export default WelcomePage;
