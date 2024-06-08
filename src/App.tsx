import GlobalStyle from '@/styles/globalStyle';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@/router/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
