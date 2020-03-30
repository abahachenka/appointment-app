import React from 'react';
import Logout from './admin/Logout';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="page-header">
        <div className="page-container">
            <Link to="/">
                <img src="/img/logo.png" alt="" className="logo" />
            </Link>
            <Logout />
        </div>
    </header>
)

export default Header;