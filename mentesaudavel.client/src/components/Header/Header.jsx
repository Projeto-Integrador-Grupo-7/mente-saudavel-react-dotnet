import './Header.css';
import favicon from '../../images/favicon.ico';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to={'/home'} className='logo-container'>
                <img src={favicon} alt="Logo do Mente Saudável" />
                <h2>Mente Saudável</h2>
            </Link>
            <Link to={'/dashboard'}>Dashboard</Link>
        </header>
    )
}

export default Header;