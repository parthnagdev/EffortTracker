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

export function Routes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Admin />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Switch>
    </Router>
  );
}
