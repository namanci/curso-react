import logo from './assets/next_logo.png';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
    return (
        <nav className="uk-navbar-container">
            <div className="uk-container">
                <div data-uk-navbar>
                    <div className="uk-navbar-left">
                        <a className="uk-logo" href="">
                            <img src={logo} width="125px" height="40px" alt="Tienda Next" className="uk-padding-small"></img>
                        </a>
                    </div>
                    <div className="uk-navbar-center">
                        <ul className="uk-navbar-nav">
                            <li>
                                <a href="">Inicio</a>
                            </li>
                            <li>
                                <a href="">Componentes</a>
                            </li>
                            <li>
                                <a href="">Periféricos</a>
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