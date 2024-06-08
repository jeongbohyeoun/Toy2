import MyPage from '@/pages/MyPage';
import NotFound from '@/pages/NotFound';
import Calendar from '@/pages/Calendar';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Layout from '@/components/layout/Layout';
import ApplyForm from '@/pages/ApplyForm';
import ApplyList from '@/pages/ApplyList';
import ProtectedRoute from './ProtectedRoute';

export const routes = [
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: '/mypage',
    element: (
      <ProtectedRoute>
        <Layout>
          <MyPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/apply',
    element: (
      <ProtectedRoute>
        <ApplyForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/applyList',
    element: (
      <ProtectedRoute>
        <ApplyList />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
