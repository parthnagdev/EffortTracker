import {
  Route,
  Navigate,
  Routes as Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import { NotFoundPage } from 'pages/404';
import { PAGE_ROUTES } from 'routes/page-routes';
import { ScrollToTop } from 'routes/scroll-to-top';
import { NOT_FOUND_ROUTE } from 'routes/route-path';

import Tasks from 'components/tasks';

export function Routes() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
      <Route />
        <Route path='/tasks' element={<Tasks />} />
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Switch>
    </Router>
  );
}
