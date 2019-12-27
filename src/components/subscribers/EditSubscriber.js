import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditSubscriber extends Component {

    // create refs
    nameInput = React.createRef();
    lastNameInput = React.createRef();
    codeInput = React.createRef();
    careerInput = React.createRef();

    // edit the subscriptor in the data base
    editSubscriber = e => {
        e.preventDefault();

        // create the object to update
        const suscriberUpdated = {
            name : this.nameInput.current.value,
            lastName : this.lastNameInput.current.value,
            code : this.codeInput.current.value,
            career : this.careerInput.current.value,
        }

        // extract subscriber, firestore and history of props
        const {subscriber, firestore, history} = this.props;

        // store in the data base with firestore
        firestore.update({
            collection: 'subscribers',
            doc: subscriber.id
        }, suscriberUpdated).then(history.push('/subscribers'));

    }

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
                                onSubmit={this.editSubscriber}
                            >
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Subscriber Name"
                                        required
                                        ref={this.nameInput}
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
                                        ref={this.lastNameInput}
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
                                        ref={this.careerInput}
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
                                        ref={this.codeInput}
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

EditSubscriber.propTypes = {
    firestore: PropTypes.object.isRequired
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