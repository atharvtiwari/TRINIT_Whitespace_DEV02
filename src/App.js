import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
// import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          {/* <Route path='/home' element={<Home />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
