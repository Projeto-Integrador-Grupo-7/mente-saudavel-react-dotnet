import './Footer.css';
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; Mente Saudável - {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;