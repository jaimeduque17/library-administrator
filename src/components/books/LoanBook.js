import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import SubscriberTab from '../subscribers/SubscriberTab';

class LoanBook extends Component {
    state = {
        search: '',
        result: {},
        noResults: false
    }

    // search student by code
    searchStudent = e => {
        e.preventDefault();

        // get the value to search
        const { search } = this.state;

        // extract firestore
        const { firestore } = this.props;

        // get the query
        const collection = firestore.collection('subscribers');
        const query = collection.where("code", "==", search).get();

        // read the results
        query.then(result => {
            if(result.empty) {
                // no result
                this.setState({
                    noResults: true,
                    result: {}
                })
            } else {
                // there are result
                const data = result.docs[0];
                this.setState({
                    result: data.data(),
                    noResults: false
                })
            }
        })
    }

    // store the code in the state
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        // extract the book 
        const { book } = this.props;

        // show the spinner
        if (!book) return <Spinner />

        // extract student's data
        const {noResults, result} = this.state;

        let studentTab, applyBtn;
        if(result.name) {
            studentTab = <SubscriberTab 
                            student={result}
                        />
            applyBtn = <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={this.applyLoan}
                        >
                        Apply for a loan
                        </button>
        } else {
            studentTab = null;
            applyBtn = null;
        }

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Return to the list
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <div className="i fas fa-book"></div> Apply for a loan: {book.title}
                    </h2>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.searchStudent}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Search the subscriber by code
                                </legend>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="search"
                                        className="form-control"
                                        onChange={this.readData}
                                    />
                                </div>
                                <input
                                    value="Search Student"
                                    type="submit"
                                    className="btn btn-success btn-block"
                                />
                            </form>

                            {/* show the student's tab and the button for apply for a loan*/}
                            {studentTab}
                            {applyBtn}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoanBook.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'books',
            storeAs: 'book',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        book: ordered.book && ordered.book[0]
    }))
)(LoanBook)