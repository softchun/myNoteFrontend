import React, { Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import Index from './page/Index';
import MyNote from './page/MyNote'
import FavNote from './page/FavNote';
import EditProfile from './page/EditProfile';
import CreateNote from './page/CreateNote';
import EditNote from './page/EditNote';
import ViewNote from './page/ViewNote';

function App() {

  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/' element={<Index />} />
            <Route exact path='/home' element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home />} />
            </Route>
            <Route exact path='/login' element={<PublicRoute />}>
              <Route exact path='/login' element={<Login />} />
            </Route>
            <Route exact path='/mynote' element={<PrivateRoute />}>
              <Route exact path='/mynote' element={<MyNote />} />
            </Route>
            <Route exact path='/fav' element={<PrivateRoute />}>
              <Route exact path='/fav' element={<FavNote />} />
            </Route>
            <Route exact path='/editprofile' element={<PrivateRoute />}>
              <Route exact path='/editprofile' element={<EditProfile />} />
            </Route>
            <Route exact path='/createnote' element={<PrivateRoute />}>
              <Route exact path='/createnote' element={<CreateNote />} />
            </Route>
            <Route exact path='/editnote/:id' element={<PrivateRoute />}>
              <Route exact path='/editnote/:id' element={<EditNote />} />
            </Route>
            <Route exact path='/viewnote/:id' element={<PrivateRoute />}>
              <Route exact path='/viewnote/:id' element={<ViewNote />} />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App