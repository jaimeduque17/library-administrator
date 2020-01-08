import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    // login in firebase
    logIn = e => {
        e.preventDefault();

        // extract firebase
        const { firebase } = this.props;

        // extract the state
        const { email, password } = this.state;

        // authenticate the user
        firebase.login({
            email,
            password
        })
            .then(result => console.log('You logged in'))
            .catch(error => console.log('There was an error'))
    }

    // store that the user writes in the state
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Log in
                            </h2>
                            <form
                                onSubmit={this.logIn}
                            >
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.readData}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.readData}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Log In"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);