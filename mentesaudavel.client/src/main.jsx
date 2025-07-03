import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home/Home';
import Cadastro from './pages/Usuario/Cadastro';
import Login from './pages/Usuario/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Resultado from './pages/Resultado/Resultado';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/home',
                element: <Home />,
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
                path: '/dashboard',
                element: <Dashboard />
            },
             {
                path: '/resultado',
                element: <Resultado />
            }
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RouterProvider router = { router } />
        </StrictMode>
    );
}