import React from 'react';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

    const history = useHistory();
    const logoutHandler = () => {
        localStorage.clear();
        localStorage.removeItem("authToken");
        history.push('/login');
    }

    return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo"> Adrixus Task</h1>
            <ul className='nav-menu'>
                <li>
                    <Link className='nav-link' to={`/login`} onClick={logoutHandler} type="button">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    )
}


export default Navbar;