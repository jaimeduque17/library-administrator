import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const ShowSubscriber = ({ subscriber }) => {
    if (!subscriber) return <Spinner />
    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/subscribers" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Return to the list
                </Link> 
            </div>
            <div className="col-md-6">
                <Link to={`/subscribers/edit/${subscriber.id}`} className="btn btn-primary float-right">
                    <div className="i fas fa-pencil-alt"></div> Edit Subscriber
                </Link>
            </div>
            <hr className="mx-5 w-100" />
                <div className="col-12">
                    <h2 className="mb-4">
                        {subscriber.name} {subscriber.lastName}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            Career:
                        </span> {subscriber.career}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Code:
                        </span> {subscriber.code}
                    </p>
                </div>
        </div>
    );
}

ShowSubscriber.propTypes = {
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
)(ShowSubscriber)