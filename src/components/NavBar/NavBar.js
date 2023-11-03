import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './assets/next_logo.png';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    return (
        <nav className="uk-navbar-container">
            <div className="uk-container">
                <div data-uk-navbar="mode: click">
                    <div className="uk-navbar-left">
                        <Link className="uk-link-reset uk-navbar-toggle-animate uk-hidden@m" to="#" data-uk-navbar-toggle-icon></Link>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-nav-secondary uk-text-uppercase uk-navbar-dropdown-nav">
                                <li>
                                    <NavLink to={`/`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Inicio</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/categoria/componentes`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Componentes</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/categoria/perifericos`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Periféricos</NavLink>
                                </li>
                            </ul>
                        </div>
                        <Link className="uk-logo" to={`/`}>
                            <img src={logo} width="125px" height="40px" alt="Tienda Next" className="uk-padding-small"></img>
                        </Link>
                    </div>
                    <div className="uk-navbar-center uk-visible@m">
                        <ul className="uk-navbar-nav">
                            <li>
                                <NavLink to={`/`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/categoria/componentes`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Componentes</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/categoria/perifericos`} className={({ isActive }) => isActive ? "uk-text-bolder" : ""}>Periféricos</NavLink>
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