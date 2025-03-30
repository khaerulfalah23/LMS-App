import { createBrowserRouter } from 'react-router-dom';
import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import SuccessCheckoutPage from '../pages/SuccessCheckout';

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
]);

export default router;
