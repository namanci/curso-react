import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './assets/next_logo.png';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    return (
        <nav className="uk-navbar-container">
            <div className="uk-container">
                <div data-uk-navbar>
                    <div className="uk-navbar-left">
                        <Link className="uk-logo" to={`/`}>
                            <img src={logo} width="125px" height="40px" alt="Tienda Next" className="uk-padding-small"></img>
                        </Link>
                    </div>
                    <div className="uk-navbar-center">
                        <ul className="uk-navbar-nav">
                            <li>
                                <NavLink to={`/`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/categoria/componentes`} className={({ isActive, isPending }) => isActive ? "uk-text-bolder" : ""}>Componentes</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/categoria/perifericos`} className={({ isActive, isPending }) => isActive ? "uk-text-bolder" : ""}>Periféricos</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="uk-navbar-right">
                        <CartWidget />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;