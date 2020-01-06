import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewBook extends Component {
    state = {
        title: '',
        ISBN: '',
        editorial: '',
        existence: ''
    }

    // save the book in the data base
    addBook = e => {
        e.preventDefault();

        // take a copy of the state
        const newBook = this.state;

        // add array of interested clients
        newBook.borrowed = [];

        // extract firestore with the methods
        const { firestore, history } = this.props;

        // add to the data base and redirect
        firestore.add({collection: 'books'}, newBook)
            .then(() => history.push('/'))
    }

    // stores in the state what the user writes 
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> Return to the List
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> New Book
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.addBook}
                            >
                                <div className="form-group">
                                    <label>Title: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title or Book's Name"
                                        required
                                        value={this.state.title}
                                        onChange={this.readData}
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
                                        value={this.state.editorial}
                                        onChange={this.readData}
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
                                        value={this.state.ISBN}
                                        onChange={this.readData}
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
                                        value={this.state.existence}
                                        onChange={this.readData}
                                    >
                                    </input>
                                </div>
                                <input type="submit" value="Add Book" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewBook.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewBook);