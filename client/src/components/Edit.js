import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Editpost.css';
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

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      image: '',
      body: '',
      title: '',
      date: null,
      newbody: '',
      newimage: '',
      newtitle: '',
      resMsg: null,
      msgType: ''
    };
    this.makenewpost = this.makenewpost.bind(this);
    this.changetitle = this.changetitle.bind(this);
    this.changeurl = this.changeurl.bind(this);
    this.changebody = this.changebody.bind(this);
  }
  changebody(event) {
    this.setState({ newbody: event.target.value });
  }
  changetitle(event) {
    const valueOfTitle =
      event.target.value.length < 1 ? this.state.title : event.target.value;
    this.setState({ newtitle: valueOfTitle });
  }
  changeurl(event) {
    this.setState({ newimage: event.target.value });
  }
  async makenewpost(event) {
    console.log('Button clicked');
    event.preventDefault();
    if (
      this.state.newimage === this.state.image &&
      this.state.newtitle === this.state.title &&
      this.state.newbody === this.state.body
    ) {
      alert('Nothing changed');
    } else {
      if (
        this.state.newtitle === '' &&
        this.state.newbody === '' &&
        this.state.newimage === ''
      ) {
        alert('No changes observed');
      } else {
        const updateTitle = this.state.newtitle
          ? this.state.newtitle
          : this.state.title;
        const updateBody = this.state.newbody
          ? this.state.newbody
          : this.state.body;
        const updateImage = this.state.newimage
          ? this.state.newimage
          : this.state.image;
        this.setState(
          { newbody: updateBody, newtitle: updateTitle, newimage: updateImage },
          async () => {
            console.log(`title: ${this.state.newtitle},
                text: ${this.state.newbody},
                imgUrl: ${this.state.newimage}`);
            await axios
              .put(`http://localhost:5000/create/edit/${this.state.id}`, {
                title: this.state.newtitle,
                text: this.state.newbody,
                imgUrl: this.state.newimage
              })
              .then((res) => {
                this.setState({ resMsg: res.data.msg, msgType: 'success' });
              })
              .catch((err) => {
                this.setState({ resMsg: 'Network error', msgType: 'danger' });
              });
          }
        );
      }
    }
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/post/getparticular/${
          window.location.pathname.split('/')[3]
        }`
      )
      .then((res) => {
        this.setState({
          title: res.data.title,
          body: res.data.body,
          image: res.data.imgURL,
          date: res.data.date,
          id: res.data._id
        });
        document.getElementById('body').value = this.state.body;
        document.getElementById('title').value = this.state.title;
        document.getElementById('image').value = this.state.image;
      });
  }
  render() {
    const dateToday = new Date(this.state.date);
    const classForMsg = `text-center text-${this.state.msgType} pb-20`;
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
              id="submitform"
            >
              <h1 className="text-center p-0 m-0">Edit Post</h1>
              <p className="text-center">
                {monthName[dateToday.getMonth()] +
                  ' ' +
                  dateToday.getDate() +
                  ', ' +
                  dateToday.getFullYear()}
              </p>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder={this.state.title}
                  onChange={this.changetitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  placeholder="Enter new URL here"
                  onChange={this.changeurl}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body" className="required">
                  Body
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter your edited body here"
                  id="body"
                  onChange={this.changebody}
                  style={{ minHeight: '30vh' }}
                ></textarea>
              </div>
              <div className="form-group w-full text-center pb-5">
                <input
                  id="submitbutton"
                  className="py-10 px-20 mx-10 rounded font-weight-bold submit-button-post"
                  type="submit"
                  value="Edit"
                />
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <input
                    type="button"
                    className="py-10 px-20 mx-10 rounded font-weight-bold cancel-button-post"
                    value="Close"
                  />
                </Link>
              </div>
              <p className={classForMsg}>{this.state.resMsg}</p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
