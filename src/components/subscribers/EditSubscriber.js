import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditSubscriber extends Component {

    // create refs
    

    render() {

        const { subscriber } = this.props;

        if(!subscriber) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/subscribers"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Return to the list
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <div className="i fas fa-user"></div> Edit Subscriber
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
                                        defaultValue={subscriber.name}
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
                                        defaultValue={subscriber.lastName}
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
                                        defaultValue={subscriber.career}
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
                                        defaultValue={subscriber.code}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Edit Subscriber"
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

export default compose(
    firestoreConnect(props => [
        {
            collection: 'subscribers',
            storeAs: 'subscriber',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        subscriber: ordered.subscriber && ordered.subscriber[0]
    }))
)(EditSubscriber)