
import React, { useContext, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import Login from './auth/Login';
import SignIn from './auth/SignIn';
import { Context } from './context/Context';

const App = () => {
  const { isAuthenticated } = useContext(Context);
  const [showSignIn, setShowSignIn] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        {showSignIn ? (
          <div className='login'>
            <SignIn />
            <p className='st' >
              Already have an account?{' '}
              <button onClick={() => setShowSignIn(false)}>Login</button>
            </p>
          </div>
        ) : (
          <div className='login'>
            <Login />
            <p className= 'st' >
              Don’t have an account?{' '}
              <button onClick={() => setShowSignIn(true)}>Sign Up</button>
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <Main />
    </>
  );
};

export default App;

// import React from 'react'
// import Sidebar from './components/Sidebar/Sidebar'
// import Main from './components/Main/Main'

// const App = () => {
//   return (
//     <>
//     <Sidebar/>
//     <Main/>
//     </>
    

//   )
// }

// export default App

