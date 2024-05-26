import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const handleClick = (e) => {
        e.preventDefault()
        const navbarMenu = document.querySelector('.navbar-menu')
        navbarMenu.classList.toggle('is-active')
    }

    return(
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">Alpaca Paper Trading</Link>
                    <a href="" role="button" class="navbar-burger" onClick={handleClick} data-target="navMenu" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                
                <div className="navbar-menu" id="navbarMenuHeroB">
                    <div className="navbar-end">
                        <div className="navbar-item">   
                            <a className="navbar-item" onClick={handleClick}>
                                <Link to="/" className="navbar-item">Home</Link>
                            </a>
                            <a className="navbar-item" onClick={handleClick}>
                                <Link to="/dashboard" className="navbar-item">Dashboard</Link>
                            </a>
                            <a className="navbar-item" onClick={handleClick}>
                                <Link to="/market" className="navbar-item">Market Data</Link>
                            </a>
                            {props.isLoggedIn
                            ? <div className="navbar-button">
                            <Link to="/users" className="button is-danger is-rounded" onClick={props.onLogout}>Logout</Link>
                            </div>
                            : <div className="buttons is-centered">
                            <div className="navbar-button">
                                <Link to="/users" className="button is-rounded is-primary">Login</Link>
                            </div>
                            <div className="navbar-button">
                                <Link to="/users/register" className="button is-rounded is-danger">Sign Up!</Link>
                            </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;