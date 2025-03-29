import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>hello</h1>
      </div>
    ),
  },
  {
    path: '/manager/sign-up',
    element: <SignUpPage />,
  },
]);

export default router;
