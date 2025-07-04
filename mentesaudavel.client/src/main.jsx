import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home/Home';
import Cadastro from './pages/Usuario/Cadastro';
import Login from './pages/Usuario/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Questionario from './pages/Questionario/Questionario';
import Resultado from './pages/Resultado/Resultado';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><Home /></ProtectedRoute>,
            },
            {
                path: '/home',
                element: <ProtectedRoute><Home /></ProtectedRoute>,
            },
            {
                path: '/cadastro',
                element: <Cadastro />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/questionario',
                element: <ProtectedRoute><Questionario /></ProtectedRoute>,
            },
            {
                path: '/resultado',
                element: <ProtectedRoute><Resultado /></ProtectedRoute>,
            },
            {
                path: '/dashboard',
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
            }
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}