import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditBook extends Component {

    // refs
    titleInput = React.createRef();
    editorialInput = React.createRef();
    ISBNInput = React.createRef();
    existenceInput = React.createRef();

    // update the book in Firebase
    updateBook = e => {
        e.preventDefault();

        // build the new object
        const updatedBook = {
            title: this.titleInput.current.value,
            editorial: this.editorialInput.current.value,
            ISBN: this.ISBNInput.current.value,
            existence: this.existenceInput.current.value,
        }

        // read Firestore and history
        const { firestore, history, book } = this.props;

        // update in firestore
        firestore.update({
            collection: 'books',
            doc: book.id
        }, updatedBook).then(history.push('/'))
    }

    render() {

        // get the book
        const { book } = this.props;

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
                        <div className="i fas fa-book"></div> Edit Book
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.updateBook}
                            >
                                <div className="form-group">
                                    <label>Title: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title or Book's Name"
                                        required
                                        defaultValue={book.title}
                                        ref={this.titleInput}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label>Editorial: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Book's Editorial"
                                        required
                                        defaultValue={book.editorial}
                                        ref={this.editorialInput}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label>ISBN: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="Book's ISBN"
                                        required
                                        defaultValue={book.ISBN}
                                        ref={this.ISBNInput}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label>Existence: </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existence"
                                        placeholder="Book's existence"
                                        required
                                        defaultValue={book.existence}
                                        ref={this.existenceInput}
                                    >
                                    </input>
                                </div>
                                <input type="submit" value="Edit Book" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditBook.propTypes = {
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
)(EditBook)