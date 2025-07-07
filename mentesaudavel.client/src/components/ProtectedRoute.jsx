import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    return isTokenValid ? children : <Navigate to="/login" replace />;
};

function isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    }
    catch (error) {
        return false;
    }
}

export default ProtectedRoute;