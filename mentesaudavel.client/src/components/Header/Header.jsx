import './Header.css';
import favicon from '../../images/favicon.ico';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [usuarioNome, setUsuarioNome] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const nome = localStorage.getItem("nome");
        if (nome) {
            setUsuarioNome(nome);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("nome");
        navigate("/login");
    };

    return (
        <header>
            <Link to={'/home'} className='logo-container'>
                <img src={favicon} alt="Logo do Mente Saudável" />
                <h2>Mente Saudável</h2>
            </Link>
            <Link to={'/questionario'}>Questionário</Link>
            <Link to={'/dashboard'}>Dashboard</Link>

            <div className="dropdown user-menu">
                <button className="btn dropdown-toggle" type="button" id="dpdUsuario" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user" style={{marginRight: '5px'}}></i>
                    {usuarioNome}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dpdUsuario">
                    <li>
                        <button onClick={handleLogout} className="dropdown-item">Sair</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;