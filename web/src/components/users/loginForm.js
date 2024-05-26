import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { apiURL } from '../config';

class LoginFields extends Component {
    render() {
        return(
            <fieldset className="field">
                <legend>Login</legend>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input is-success" name="username" type="text"/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input is-success" name="password" type="password"/>
                    </div>
                </div>

                <div className="control">
                    <button className="button is-primary is-outlined" type="submit">Submit</button>
                </div>
            </fieldset>
        )
    }
}

class LoginForm extends Component {
    // POST request body.
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            isSubmitted: null
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        
        const fetchOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                "username":formData.get('username'),
                "password":formData.get('password')
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }

        fetch(apiURL + "/api/token/", fetchOptions)
        .then(res => res.json())
        .then(result => {
            console.log('login result', result)
            if ('detail' in result) {
                let err = new Error(' Invalid username or password.')
                alert(err)
            } else if ('access' in result) {
                this.props.cookies.set('access_token', result['access'])
                this.props.onLogin()
            } else {
                let err = new Error(' Enter username and password.')
                alert(err)
            }
        })
    }

    render() {
        return(
            <div className="box" style={{ padding: '3rem'}}>
                <div className="container">
                    <form id="form" onSubmit={this.handleSubmit}>
                        <LoginFields />
                    </form>
                    <p>
                        Don't have an account? 
                        <Link className="" to="users/register"> Sign Up</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default withCookies(LoginForm);
