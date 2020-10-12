import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/search.css';
import Posts from './Posts';

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: null,
      data: [],
      shown: false,
      field: 'body',
      result: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }
  deleteArticle(id) {
    const url = `http://localhost:5000/create/delete/${id}`;
    axios
      .delete(url)
      .then((res) => {
        alert(res.data.msg);
        let newDataArray = this.state.result;
        let indexOfDeleted = '';
        for (let item in newDataArray) {
          if (newDataArray[item]._id === id) {
            indexOfDeleted = item;
          }
        }
        if (indexOfDeleted > -1) {
          newDataArray.splice(indexOfDeleted, 1);
        }
        this.setState({ result: newDataArray });
        let editDataState = this.state.data;
        let deletedIndex = '';
        for (let item in editDataState) {
          if (editDataState[item]._id === id) {
            deletedIndex = item;
          }
        }
        if (deletedIndex > -1) {
          editDataState.splice(deletedIndex, 1);
        }
        this.setState({ data: editDataState });
      })
      .catch((err) => {
        alert(err);
      });
  }
  changeSelection(name) {
    this.setState({ field: name });
  }
  handleChange(event) {
    this.setState({ query: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    let results = [];

    // searching for articles based on title
    if (this.state.field === 'title') {
      for (let item in this.state.data) {
        if (
          this.state.data[item].title
            .toLowerCase()
            .includes(this.state.query.toLowerCase())
        ) {
          results.push(this.state.data[item]);
        }
      }
      this.setState({ result: results });
    }
    //searching for articles based on body
    else if (this.state.field === 'body') {
      for (let item in this.state.data) {
        if (
          this.state.data[item].body
            .toLowerCase()
            .includes(this.state.query.toLowerCase())
        ) {
          results.push(this.state.data[item]);
        }
      }
      this.setState({ result: results });
    }

    //searching for articles based on date
    else if (this.state.field === 'date') {
      const queryDate = new Date(this.state.query);
      for (let item in this.state.data) {
        let matchResults = new Date(this.state.data[item].date);
        if (
          matchResults.getFullYear() === queryDate.getFullYear() &&
          matchResults.getDate() === queryDate.getDate() &&
          matchResults.getMonth() === queryDate.getMonth()
        ) {
          results.push(this.state.data[item]);
        }
      }
      this.setState({ result: results });
    }
  }
  async componentDidMount() {
    const recievedData = await axios.get('http://localhost:5000/post/');
    this.setState({ data: recievedData.data });
  }
  render() {
    let searchResult = null;
    if (this.state.result.length > 0) {
      const showingResults = this.state.result.map((item) => {
        return (
          <Posts
            key={item._id}
            id={item._id}
            img={item.imgURL}
            body={item.body}
            title={item.title}
            date={item.date}
            deleteaction={this.deleteArticle}
          />
        );
      });
      searchResult = showingResults;
    } else {
      searchResult = (
        <h5 className="text-center d-flex flex-column justify-content-center text-white pt-20 mt-20">
          Nothing to show here
        </h5>
      );
    }
    const titleClasses =
      this.state.field === 'title'
        ? 'btn text-white my-0 py-0 mx-10 rounded selected-radio'
        : 'btn text-white my-0 py-0 mx-10 rounded radio-buttons';
    const bodyClasses =
      this.state.field === 'body'
        ? 'btn text-white my-0 py-0 mx-10 rounded selected-radio'
        : 'btn text-white my-0 py-0 mx-10 rounded radio-buttons';
    const dateClasses =
      this.state.field === 'date'
        ? 'btn text-white my-0 py-0 mx-10 rounded selected-radio'
        : 'btn text-white my-0 py-0 mx-10 rounded radio-buttons';
    const inputType = this.state.field === 'date' ? 'date' : 'search';
    return (
      <Fragment>
        <div
          className="container-fluid bg-dark-lite pt-20 px-15 px-md-0 pb-20"
          style={{ minHeight: '100vh' }}
        >
          <h1 className="text-center text-white pt-20">Search</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type={inputType}
              className="form-control w-md-three-quarter w-full mx-auto py-20"
              placeholder="Start searching..."
              onChange={this.handleChange}
            />
            <div className="d-flex flex-column flex-md-row justify-content-center pt-20">
              <p className="mx-10 d-md-flex flex-column justify-content-center my-0 text-white text-center">
                Search by:
              </p>
              <div className="mx-auto mx-md-0 pt-10 pt-md-0">
                <button
                  type="button"
                  className={titleClasses}
                  onClick={(name) => this.changeSelection('title')}
                >
                  Title
                </button>
                <button
                  type="button"
                  className={bodyClasses}
                  onClick={(name) => this.changeSelection('body')}
                >
                  Body
                </button>
                <button
                  type="button"
                  className={dateClasses}
                  onClick={(name) => this.changeSelection('date')}
                >
                  Date
                </button>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center mt-5 pt-20 pb-20">
              <input
                className="btn mx-10 btn-primary"
                type="submit"
                value="Search"
              />
              <Link to="/">
                <button type="button" className="btn mx-10 btn-danger">
                  Exit
                </button>
              </Link>
            </div>
          </form>

          <div className="container" style={{ minHeight: '40vh' }}>
            {searchResult}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Search;
