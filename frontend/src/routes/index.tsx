import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes as Switch
} from 'react-router-dom';

import { NotFoundPage } from 'pages/404';
import { NOT_FOUND_ROUTE } from 'routes/route-path';

import Admin from 'components/admin/admin';
import NavBar from 'components/navbar';
import Tasks from 'components/tasks/tasks';
import Login from 'pages/Login';
import Projects from 'components/projects/projects';
import Users from 'components/users/users';
import Profile from 'components/users/profile';
import Register from 'pages/Register';
import Home from 'pages/Home';
import EffortTrackerHome from 'pages/effortTrackerHome';

export function Routes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route />
        <Route path='/login' element={<Login />} />
        {/*<Route path='/projects' element={<Projects />} />*/}
        <Route path='/users' element={<Users />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/' element={<EffortTrackerHome />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/tasks/:projectId' element={<Tasks />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Projects />} />
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Switch>
    </Router>
  );
}
