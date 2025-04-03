import { createBrowserRouter, redirect } from 'react-router-dom';
import { MANAGER_SESSION, STORAGE_KEY } from '../utils/const';
import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import SuccessCheckoutPage from '../pages/SuccessCheckout';
import LayoutDashboard from '../components/layout';
import secureLocalStorage from 'react-secure-storage';
import ManageCoursePage from '../pages/manager/courses';
import ManageCreateCoursePage from '../pages/manager/create-courses';

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
  {
    path: '/manager/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/success-checkout',
    element: <SuccessCheckoutPage />,
  },
  {
    path: '/manager',
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== 'manager') {
        throw redirect('/manager/sign-in');
      }

      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: (
          <div>
            <h1>hello</h1>
          </div>
        ),
      },
      {
        path: '/manager/courses',
        element: <ManageCoursePage />,
      },
      {
        path: '/manager/courses/create',
        element: <ManageCreateCoursePage />,
      },
    ],
  },
]);

export default router;
