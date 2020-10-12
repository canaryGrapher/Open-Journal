import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Newpost.css';
const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const dateToday = new Date();
const date = dateToday.getDate();
const year = dateToday.getFullYear();
const month = monthName[dateToday.getMonth()];
const titleofpost = month + ' ' + date + ', ' + year;
class Newpost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      text: '',
      imgUrl: '',
      message: '',
      msgType: ''
    };
    this.makenewpost = this.makenewpost.bind(this);
    this.changetitle = this.changetitle.bind(this);
    this.changeurl = this.changeurl.bind(this);
    this.changebody = this.changebody.bind(this);
  }
  changebody(event) {
    this.setState({ text: event.target.value });
  }
  changetitle(event) {
    const valueOfTitle =
      event.target.value.length < 1 ? titleofpost : event.target.value;
    this.setState({ title: valueOfTitle });
  }
  changeurl(event) {
    this.setState({ imgUrl: event.target.value });
  }
  makenewpost(event) {
    event.preventDefault();
    axios
      .post('http://localhost:5000/create/make', {
        title: this.state.title,
        text: this.state.text,
        imgUrl: this.state.imgUrl
      })
      .then((response) => {
        this.setState({
          message: 'Submitted post successfully',
          msgType: 'success'
        });
      })
      .catch((err) => {
        this.setState({ message: 'There was an error', msgType: 'danger' });
      });
  }
  componentDidMount() {
    this.setState({ title: titleofpost });
  }
  render() {
    const classForMsg = `text-center text-${this.state.msgType}`;
    return (
      <Fragment>
        <div className="row newpost-container bg-dark">
          <div className="col-md-4 d-none d-md-inline side-link">
            <div className="overlay w-full h-full"></div>
          </div>
          <div
            className="col-12 col-md-8 d-flex flex-column justify-content-center form-container"
            style={{ minHeight: '100vh' }}
          >
            <form
              onSubmit={this.makenewpost}
              className=" w-full px-10 w-md-three-quarter mx-auto"
            >
              <h1 className="text-center p-0 m-0">New Post</h1>
              <div className="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder={titleofpost}
                  onChange={this.changetitle}
                />
              </div>
              <div className="form-group">
                <label for="image">Image</label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  placeholder="Image URL"
                  onChange={this.changeurl}
                />
              </div>
              <div className="form-group">
                <label for="body" className="required">
                  Body
                </label>
                <textarea
                  className="form-control"
                  placeholder="What is it that you want to write?"
                  required="required"
                  id="body"
                  onChange={this.changebody}
                  style={{ minHeight: '30vh' }}
                ></textarea>
              </div>
              <div className="form-group w-full text-center">
                <input
                  class="py-10 px-20 rounded font-weight-bold submit-button-post"
                  type="submit"
                  value="Submit"
                />
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <input
                    type="button"
                    className="py-10 px-20 mx-10 rounded font-weight-bold cancel-button-post"
                    value="Close"
                  />
                </Link>
              </div>
              <p className={classForMsg}>{this.state.message}</p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Newpost;
