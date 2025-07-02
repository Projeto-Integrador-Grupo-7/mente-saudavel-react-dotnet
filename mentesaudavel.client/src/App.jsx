import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';

const App = () => {
    debugger;
    const location = useLocation();
    const hideNavigation = ["/login", "/cadastro"].includes(location.pathname.toLowerCase());

    return (
        <div className="app-container">
            {!hideNavigation && <Header />}
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default App;