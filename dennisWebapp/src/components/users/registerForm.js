import React, { Component } from 'react';

class RegisterFields extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log('submitting..')
        this.props.onSubmit(e)
    }

    render() {
        return(
            <form method="POST" id="form" action="" onSubmit={this.handleSubmit}>
                <fieldset className="field" disabled>
                    <legend>Register</legend>
                    
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input is-success" name="username" type="text" maxLength="15" required/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input is-success" name="email" type="email" required/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input is-success" name="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" type="password"/>
                        </div>
                        <div>
                            Password requirements:
                            <div>
                                Minimum length of 8 characters, 1 Uppercase letter, 1 Lowercase letter, 1 Number
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input className="input is-success" name="confirmPassword" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" type="password"/>
                        </div>
                    </div>

                    <div className="control">
                        <button className="button is-primary is-outlined" type="submit">Submit</button>
                    </div>
                </fieldset>
            </form>
        )
    }

}

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e) {
        // check if password is valid, post request
        const formData = new FormData(e.target)

        const username = formData.get('username')
        const password = formData.get('password')
	    const email = formData.get('email')
        const confirmPassword = formData.get('confirmPassword')

        const fetchOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                "username": username,   
                "password": password,
		"email": email
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }

        if (password === confirmPassword) {
            fetch("https://johnnythai.dev/api/users/create/",
            // fetch("http://localhost:8000/api/users/create/",
            fetchOptions)
            .then(res => res.json())
        } else {
            const err = new Error(' Password must match confirmation password.')
            alert(err)
        }
    }

    render() {
        alert('This page is under construction. Some features are disabled.')
        
        return(
            <div className="container">
                <div className="box" style={{ padding: '3rem'}}>
                    {/* <RegisterFields onSubmit={this.handleSubmit} /> */}
                    <RegisterFields />
                </div>
            </div>
        )
    }
}

export { RegisterForm };
