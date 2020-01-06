import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class LoanBook extends Component {
    state = {}
    render() {

        // extract the book 
        const { book } = this.props;

        // show the spinner
        if (!book) return <Spinner />

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
                            <form>
                                <legend className="color-primary text-center">
                                    Search the subscriber for code
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