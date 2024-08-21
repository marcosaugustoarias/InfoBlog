import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import UserList from './components/UserList';
import GoogleLogin from './components/GoogleLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/users" element={<GoogleLogin><UserList /></GoogleLogin>} />
      </Routes>
    </Router>
  );
}

export default App;