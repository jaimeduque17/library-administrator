import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewSubscriber extends Component {
    state = {
        name: '',
        lastName: '',
        career: '',
        code: ''
    }

    // add subscriber to the data base
    addSubscriber = e => {
        e.preventDefault();

        // extract the state values
        const newSubscriber = { ...this.state };
        console.log(newSubscriber);

        // extract firestore of props
        const { firestore, history } = this.props;

        // save in the data base
        firestore.add({ collection: 'subscribers' }, newSubscriber)
            .then(() => history.push('/subscribers'))
    }

    // extract the input values and it put in th state
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/subscribers"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Return to the list
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <div className="i fas fa-user-plus"></div> New Subscriber
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.addSubscriber}
                            >
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Subscriber Name"
                                        required
                                        onChange={this.readData}
                                        value={this.state.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Subscriber Last Name"
                                        required
                                        onChange={this.readData}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Career:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="career"
                                        placeholder="Subscriber Career"
                                        required
                                        onChange={this.readData}
                                        value={this.state.career}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Code:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="code"
                                        placeholder="Subscriber Code"
                                        required
                                        onChange={this.readData}
                                        value={this.state.code}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Add Subscriber"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewSubscriber.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewSubscriber);