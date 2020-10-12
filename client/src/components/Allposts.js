import React, { Fragment, Component } from 'react';
import axios from 'axios';
import Posts from './Posts';
import '../styles/postspage.css';
import { Link } from 'react-router-dom';

class Allposts extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      deleted: 0
    };
    this.deleteArticle = this.deleteArticle.bind(this);
  }
  deleteArticle(id) {
    const url = `http://localhost:5000/create/delete/${id}`;
    axios
      .delete(url)
      .then((res) => {
        alert(res.data.msg);
        let newDataArray = this.state.data;
        let indexOfDeleted = '';
        for (let item in newDataArray) {
          if (newDataArray[item]._id === id) {
            indexOfDeleted = item;
          }
        }
        if (indexOfDeleted > -1) {
          newDataArray.splice(indexOfDeleted, 1);
        }
        this.setState({ data: newDataArray });
      })
      .catch((err) => {
        alert(err);
      });
  }

  async componentDidMount() {
    const recievedData = await axios.get('http://localhost:5000/post/');
    this.setState({ data: recievedData.data });
  }
  render() {
    const setCards = this.state.data.map((item) => {
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
    return (
      <Fragment>
        <div className="row posts-container">
          <div className="col-12">
            <h1
              className="text-center font-weight-bold text-white"
              onClick={this.toastPrimaryAlert}
            >
              All posts
            </h1>
            <Link to="/new">
              <p className="text-center font-weight-bold mx-auto new-post-button">
                New Post
              </p>
            </Link>
            <span>{setCards}</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Allposts;
