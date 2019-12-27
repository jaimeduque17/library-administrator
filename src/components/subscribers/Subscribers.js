import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Subscribers = ({ subscribers, firestore }) => {

    if (!subscribers) return <Spinner />;

    // delete subscribers
    const deleteSubscriber = id => {
        // delete
        firestore.delete({
            collection: 'subscribers',
            doc: id
        });
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                    to="/subscribers/new"
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> New Subscriber
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Subscribers
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Name</th>
                        <th>Career</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map(subscriber => (
                        <tr key={subscriber.id}>
                            <td>{`${subscriber.name} ${subscriber.lastName}`}</td>
                            <td>{subscriber.career}</td>
                            <td>
                                <Link
                                    to={`/subscribers/show/${subscriber.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i> More Information
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => deleteSubscriber(subscriber.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
Subscribers.propTypes = {
    firestore: PropTypes.object.isRequired,
    subscribers: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: 'subscribers' }]),
    connect((state, props) => ({
        subscribers: state.firestore.ordered.subscribers
    }))
)(Subscribers);