import { createBrowserRouter, redirect } from 'react-router-dom';
import { MANAGER_SESSION, STORAGE_KEY } from '../utils/const';
import SignUpPage from '../pages/SignUp';
import SignInPage from '../pages/SignIn';
import SuccessCheckoutPage from '../pages/SuccessCheckout';
import LayoutDashboard from '../components/layout';
import secureLocalStorage from 'react-secure-storage';
import ManageCoursePage from '../pages/manager/courses';
import ManageCreateCoursePage from '../pages/manager/create-courses';
import ManageCourseDetailPage from '../pages/manager/course-detail';
import ManageContentCreatePage from '../pages/manager/course-create-content';
import { getCategories } from '../services/categoryService';
import {
  getCourseDetail,
  getCourses,
  getDetailContent,
} from '../services/courseService';
import ManageCoursePreviewPage from '../pages/manager/course-preview';

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
        loader: async () => {
          const courses = await getCourses();
          return courses;
        },
        element: <ManageCoursePage />,
      },
      {
        path: '/manager/courses/create',
        loader: async () => {
          const categories = await getCategories();
          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: '/manager/courses/:id',
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: '/manager/courses/edit/:id',
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course?.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: '/manager/courses/:id/create',
        element: <ManageContentCreatePage />,
      },
      {
        path: '/manager/courses/:id/edit/:contentId',
        loader: async ({ params }) => {
          const content = await getDetailContent(params.contentId);

          return content?.data;
        },
        element: <ManageContentCreatePage />,
      },
      {
        path: '/manager/courses/:id/preview',
        element: <ManageCoursePreviewPage />,
      },
    ],
  },
]);

export default router;
