import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f4 dim black link pointer underline pa1 pr4"
        onClick={() => onRouteChange('signout')}
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          className="f4 dim black link pointer underline pa1 pr4"
          onClick={() => onRouteChange('register')}
        >
          Register
        </p>
        <p
          className="f4 dim black link pointer underline pa1 pr4"
          onClick={() => onRouteChange('signin')}
        >
          Sign In
        </p>
      </nav>
    </>
  );
};

export default Navigation;
