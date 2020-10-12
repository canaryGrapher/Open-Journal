import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import '../styles/posts.css';
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Posts = (props) => {
  const DateObject = Date.parse(props.date);
  const newDateObject = new Date(DateObject);
  const dateNumber =
    newDateObject.getDate() < 10
      ? '0' + newDateObject.getDate()
      : newDateObject.getDate();
  const postLink = '/post/' + props.id;
  const editLink = '/edit/post/' + props.id;
  return (
    <Fragment>
      <div className="w-full">
        <div className="card px-15 py-15 py-md-0 bg-dark text-white">
          <div className="row">
            <div className="col-12 col-md-2 text-center d-flex flex-row flex-row flex-md-column my-auto">
              <h1 className="my-0 py-0 font-weight-bold d-none d-md-inline">
                {dateNumber}
              </h1>
              <h5 className="mx-5 my-0 py-0 d-md-none font-weight-bold">
                {dayNames[newDateObject.getDay()]}
              </h5>
              <h5 className="mx-5 my-0 py-0 d-md-none">{dateNumber}</h5>
              <h5 className="mx-5 my-0 py-0">
                {month[newDateObject.getMonth()].toUpperCase() +
                  ' ' +
                  newDateObject.getFullYear()}
              </h5>
              <h5 className="mx-5 my-0 py-0">
                {newDateObject.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </h5>
            </div>
            <div className="col-12 col-md-10 my-auto py-md-20">
              <Link to={postLink}>
                <h4
                  className="font-weight-bold mb-0 pb-0 text-white"
                  style={{ textDecoration: 'none' }}
                >
                  {props.title}
                </h4>
                <LinesEllipsis
                  text={props.body}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  className="text-white"
                />
              </Link>
              <div className="row pt-10">
                <button
                  className="btn btn-danger mt-10 mx-10"
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this post?')) {
                      props.deleteaction(props.id);
                    }
                  }}
                >
                  Delete
                </button>
                <Link to={editLink}>
                  <button className="btn btn-primary mt-10 mx-10" type="button">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Posts;
