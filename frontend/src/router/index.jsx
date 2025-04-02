import { createBrowserRouter, redirect } from 'react-router-dom';
import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import SuccessCheckoutPage from '../pages/SuccessCheckout';
import LayoutDashboard from '../components/layout';
import { MANAGER_SESSION, STORAGE_KEY } from '../utils/const';
import secureLocalStorage from 'react-secure-storage';

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
    ],
  },
]);

export default router;
