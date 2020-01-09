import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import SubscriberTab from '../subscribers/SubscriberTab';

// Redux Actions
import { searchUser } from '../../actions/searchUserActions';

class LoanBook extends Component {
    state = {
        search: '',
        noResults: false
    }

    // search student by code
    searchStudent = e => {
        e.preventDefault();

        // get the value to search
        const { search } = this.state;

        // extract firestore
        const { firestore, searchUser } = this.props;

        // get the query
        const collection = firestore.collection('subscribers');
        const query = collection.where("code", "==", search).get();

        // read the results
        query.then(result => {
            if (result.empty) {
                // no result
                // store in redux an empty object
                searchUser({});

                // update the state if there aren't results
                this.setState({
                    noResults: true,
                });
            } else {
                // there are result
                // add the result in the redux state
                const data = result.docs[0];
                searchUser(data.data());

                // update the state if there are results
                this.setState({
                    noResults: false
                })
            }
        })
    }

    // store the student's data for apply the book
    applyLoan = () => {
        const { user } = this.props;

        // discharge date
        user.apply_date = new Date().toLocaleDateString();

        // the props can't mutate, take a copy and create a new array
        let borrowed = [];
        borrowed = [...this.props.book.borrowed, user];

        // copy the object and add the borrowed
        const book = { ...this.props.book };

        // delete previous borrowed
        delete book.borrowed;

        // assign the borrowed
        book.borrowed = borrowed;

        // get firestore and history of props
        const { firestore, history } = this.props;

        // store in the data base
        firestore.update({
            collection: 'books',
            doc: book.id
        }, book).then(history.push('/'));
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
        const { user } = this.props;

        let studentTab, applyBtn;
        if (user.name) {
            studentTab = <SubscriberTab
                student={user}
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

        // show error message
        const { noResults } = this.state;
        let resultMsg = '';
        if (noResults) {
            resultMsg = <div className="alert alert-danger text-center font-weight-bold">No Results</div>;
        } else {
            resultMsg = null;
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

                            {/* show message "No Results" */}
                            {resultMsg}

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
    connect(({ firestore: { ordered }, user }, props) => ({
        book: ordered.book && ordered.book[0],
        user: user
    }), { searchUser })
)(LoanBook)