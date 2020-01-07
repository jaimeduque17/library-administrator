import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class ShowBook extends Component {

    returnBook = id => {
        // extract firestore
        const {firestore} = this.props;

        // book's copy
        const bookUpdated = {...this.props.book};

        // delete the student tht is making the devolution of borrowed
        const borrowed = bookUpdated.borrowed.filter(element => element.code !== id);
        bookUpdated.borrowed = borrowed;

        // update in firebase
        firestore.update({
            collection: 'books',
            doc: bookUpdated.id
        }, bookUpdated);
    }

    render() {

        // extract the book
        const { book } = this.props;

        if (!book) return <Spinner />

        // button to request a book
        let btnBorrowed;

        if (book.existence - book.borrowed.length > 0) {
            btnBorrowed = <Link
                to={`/books/borrowed/${book.id}`}
                className="btn btn-success my-3"
            >Apply for a loan</Link>
        } else {
            btnBorrowed = null;
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Return to the List
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/books/edit/${book.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> Edit Book
                    </Link>
                </div>
                <hr className="mx-5 w-100" />
                <div className="col-12">
                    <h2 className="mb-4">{book.title}</h2>
                    <p>
                        <span className="font-weight-bold">
                            ISBN:
                        </span> {''}
                        {book.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Editorial:
                        </span> {''}
                        {book.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Existence:
                        </span> {''}
                        {book.existence}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Borrowed:
                        </span> {''}
                        {book.existence - book.borrowed.length}
                    </p>
                    {/* button to request a loan */}
                    {btnBorrowed}

                    {/* show the students that have the books */}
                    <h3 className="my-2">Students that have the book borrowed</h3>
                    {book.borrowed.map(loan => (
                        <div key={loan.code} className="card my-2">
                            <h4 className="card-header">
                                {loan.name} {loan.lastName}
                            </h4>
                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Code:
                                    </span> {''}
                                    {loan.code}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Career:
                                    </span> {''}
                                    {loan.career}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Apply date:
                                    </span> {''}
                                    {loan.apply_date}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => this.returnBook(loan.code)}
                                >
                                    Make a refund
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

ShowBook.propTypes = {
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
)(ShowBook)