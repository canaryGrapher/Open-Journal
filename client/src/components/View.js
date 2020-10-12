import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

export default class View extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      image: null,
      body: null,
      title: null,
      date: null
    };
    this.deleteArticle = this.deleteArticle.bind(this);
  }
  deleteArticle(id) {
    const url = `http://localhost:5000/create/delete/${id}`;
    axios
      .delete(url)
      .then((res) => {
        alert(res.data.msg);
        window.location.replace('/');
      })
      .catch((err) => {
        alert(err);
      });
  }
  async componentDidMount() {
    await axios
      .get(
        `http://localhost:5000/post/getparticular/${
          window.location.pathname.split('/')[2]
        }`
      )
      .then((res) => {
        const response = res.data;
        this.setState({
          image: response.imgURL,
          body: response.body,
          title: response.title,
          id: response._id,
          date: response.date
        });
      });
  }
  render() {
    const dateToday = new Date(this.state.date);
    const backgroundImageLink = this.state.image
      ? this.state.image
      : 'https://images.unsplash.com/photo-1462331321792-cc44368b8894?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9';
    const locationTOedit = `/edit/post/${this.state.id}`;
    return (
      <Fragment>
        <div
          className="w-full"
          style={{
            minHeight: '100vh',
            backgroundImage: `url("${backgroundImageLink}"`,
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
          }}
        >
          <div
            style={{
              paddingTop: '50vh',
              backgroundColor: 'transparent'
            }}
          >
            <div
              className="container bg-dark text-white pt-20 px-10"
              style={{ paddingBottom: '10vh' }}
            >
              <h2 className="text-center pt-20">{this.state.title}</h2>
              <div className="container m-0 pt-20 pl-10 w-md-half mx-auto">
                <h5 className="font-weight-bold mb-0 font-size-24">
                  {dateToday.getDate() +
                    ' ' +
                    monthName[dateToday.getMonth()] +
                    ', ' +
                    dateToday.getFullYear()}
                  ,{' '}
                  {dateToday.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </h5>
              </div>
              <p className="w-md-half mx-auto text-justify pb-20 font-size-18">
                {this.state.body}
              </p>
              <div className="mx-auto text-center pt-20 font-size-20">
                <Link className="mx-15 font-size-20" to="/">
                  Home
                </Link>
                <Link className="mx-15 font-size-20" to="/allposts">
                  Posts
                </Link>
                <Link className="mx-15 font-size-20" to={locationTOedit}>
                  Edit
                </Link>
                <Link
                  to="#"
                  className="mx-15 font-size-20"
                  onClick={() => {
                    if (window.confirm('Delete this post?')) {
                      this.deleteArticle(this.state.id);
                    }
                  }}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
