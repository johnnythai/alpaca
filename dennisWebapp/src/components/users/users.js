import React, { Component } from 'react';
import LoginForm from './loginForm';
import Home from '../home'

const LoggedIn = () => {
    alert('Logged in!')

    return(
        <Home />
    )
}

const UsersApp = (props) => {
    return(
        <div className="container">
            {props.isLoggedIn ? <LoggedIn /> : <LoginForm onLogin={props.onLogin} />}
        </div>
    )
}

export { UsersApp };