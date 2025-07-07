import './Footer.css';
import React from 'react';

const Footer = () => {
    return (
        <footer>
            &copy; Mente Saudável - {new Date().getFullYear()}
        </footer>
    );
};

export default Footer;