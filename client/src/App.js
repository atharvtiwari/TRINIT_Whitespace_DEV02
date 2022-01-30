import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Issues from './pages/Issues';
import IssuePage from './pages/IssuePage'
import NewIssue from './pages/NewIssue';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/issues' element={<Issues />}/>
          <Route path='/issues/:issueID' element={<IssuePage />}/>
          <Route path='/newissue' element={<NewIssue />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
