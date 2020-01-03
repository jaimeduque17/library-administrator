import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewBook extends Component {
    state = {
        title: '',
        ISBN: '',
        editorial: '',
        existence: ''
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
                            <form>
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

export default NewBook;