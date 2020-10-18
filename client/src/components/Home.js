import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchIcon from '../resources/search.png';
import postIcon from '../resources/post.png';
import keyboardIcon from '../resources/keyboard.png';
import '../styles/home.css';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      recent: null,
      difference: null,
      count: 0,
      quote: null,
      author: null,
      image: null,
      weather: {},
      otherWeatherData: {}
    };
  }
  async componentDidMount() {
    await axios
      .get('http://localhost:5000/post/information')
      .then((res) => {
        const dateObject = new Date();
        const dateRecieved = new Date(res.data.recent);
        const differenceDate = Math.floor(
          (dateObject.getTime() - dateRecieved.getTime()) / (3600000 * 24)
        );
        this.setState({
          recent: dateRecieved,
          difference: differenceDate,
          count: res.data.count,
          api_key: res.data.api_key
        });
      })
      .catch((err) => {
        alert('Network error');
      });
    const recievedQuote = await axios.get('https://api.quotable.io/random');
    this.setState({
      quote: recievedQuote.data.content,
      author: recievedQuote.data.author
    });
    const dateTodayImage = new Date();
    const imageLocation =
      window.location.origin + `/daily/${dateTodayImage.getDate()}.jpg`;
    this.setState({
      image: imageLocation
    });
    
    // change the parameter of q to whatever city you want the weather data for
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=jodhpur&units=metric&appid=${this.state.api_key}`
      )
      .then((res) => {
        const sunset = new Date(res.data.sys.sunset);
        this.setState({
          weather: res.data.main,
          city: res.data.name,
          country: res.data.sys.country,
          weatherdescription: res.data.weather[0].description,
          sunset: `${sunset.getHours()}${sunset.getMinutes()} hrs`,
          icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        });
      });
  }
  render() {
    let accordingToInterval = null;
    if (this.state.difference <= 3) {
      accordingToInterval = 'text-center text-success my-0 py-0';
    } else if (this.state.difference > 3 && this.state.difference < 8) {
      accordingToInterval = 'text-center text-warning my-0 py-0';
    } else if (this.state.difference >= 8) {
      accordingToInterval = 'text-center text-danger my-0 py-0';
    }
    return (
      <Fragment>
        <div
          className="container-fluid all-in-all bg-dark-opacity"
          style={{
            backgroundImage: `url(${this.state.image})`,
            minHeight: '100vh'
          }}
        >
          <div
            className="container d-flex flex-column justify-content-center"
            style={{ minHeight: '100vh' }}
          >
            <div
              className="d-flex flex-md-row flex-column-reverse"
              style={{ paddingTop: '5vh' }}
            >
              <div className="col-md-8 col-12">
                <div className="card p-10 px-20 bg-dark-opacity text-dark mb-5 mx-5">
                  <h4 className="text-center">{this.state.quote}</h4>
                  <p className="text-center font-weight-bold">
                    - {this.state.author}
                  </p>
                </div>
                <div className="row mt-0">
                  <Link to={'/allposts'} className="col-md-4 col-12">
                    <div className="card bg-dark-opacity text-dark rounded text-center selection-card mt-5 mx-5">
                      <h2>Posts</h2>
                      <img
                        className="img-fluid"
                        src={postIcon}
                        alt="Article Icon"
                        style={{ height: '10vh' }}
                      />
                    </div>
                  </Link>
                  <Link to={'/search'} className="col-md-4 col-12">
                    <div className="card bg-dark-opacity text-dark rounded text-center selection-card mt-5 mx-5">
                      <h2>Search</h2>
                      <img
                        className="img-fluid"
                        src={searchIcon}
                        alt="Search Icon"
                        style={{ height: '10vh' }}
                      />
                    </div>
                  </Link>
                  <Link to={'/new'} className="col-md-4 col-12">
                    <div className="card bg-dark-opacity text-dark rounded text-center selection-card mt-5 mx-5">
                      <h2>New</h2>
                      <img
                        className="img-fluid"
                        src={keyboardIcon}
                        alt="Keyboard icon"
                        style={{ height: '10vh' }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-12 d-flex flex-column justify-content-center">
                <div className="card row p-5 bg-dark-opacity text-dark mb-5">
                  <div className="col-6">
                    <div className="col-12">
                      <h2 className="text-md-right text-center my-0">
                        {this.state.weather.temp} &deg;C
                      </h2>
                    </div>
                    <div className="col-12">
                      <p className="text-md-right text-center my-0 py-0">
                        Feels like {this.state.weather.feels_like} &deg;C
                      </p>
                    </div>
                    <div className="col-12">
                      <p className="text-md-right text-center my-0 py-0">
                        {this.state.city}, {this.state.country}
                      </p>
                    </div>
                  </div>
                  <div className="col-6 text-center my-0 py-0">
                    <img
                      className="img-fluid"
                      src={this.state.icon}
                      alt={this.state.weatherdescription}
                    />
                    <p className="my-0 py-0 text-center">
                      {this.state.weatherdescription}
                    </p>
                  </div>
                  <div className="col-12 text-center pb-10">
                    <p className="px-5 m-0">
                      Sunset at{' '}
                      <span className="font-weight-bold">
                        {this.state.sunset}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card px-5 pb-20 bg-dark-opacity text-dark mt-5">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <p className="text-center my-0 py-0">Written</p>
                      <h1 className="text-center my-0 py-0">
                        {this.state.count}
                      </h1>
                      <p className="text-center my-0 py-0">posts</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <p className="text-center my-0 py-0">Last post</p>
                      <h1 className={accordingToInterval}>
                        {this.state.difference}
                      </h1>
                      <p className="text-center my-0 py-0">days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;

// <div
//   className="container d-flex flex-column justify-content-center all-in-all"
//   style={{
//     minHeight: '100vh'
//   }}
// >
//   <div className="row">
//     <div className="row col-md-12 col-12">
//       <div className="col-12">
//         <div className="card rounded text-center selection-card m-0 mx-5">
//           <h2>New Post</h2>
//           <img
//             className="img-fluid"
//             src={keyboardIcon}
//             alt="searchIcon"
//             style={{ height: '10vh' }}
//           />
//         </div>
//       </div>

//       <div className="col-12 col-md-4">
//         <Link to={'/allposts'}>
//           <div className="card rounded text-center selection-card m-0 mx-5">
//             <h2>Posts</h2>
//             <img
//               className="img-fluid"
//               src={postIcon}
//               alt="searchIcon"
//               style={{ height: '10vh' }}
//             />
//           </div>
//         </Link>
//       </div>
//       <div className="col-12 col-md-4">
//         <Link to={'/search'}>
//           <div className="card rounded text-center selection-card m-0 mx-5">
//             <h2>Search</h2>
//             <img
//               className="img-fluid"
//               src={searchIcon}
//               alt="searchIcon"
//               style={{ height: '10vh' }}
//             />
//           </div>
//         </Link>
//       </div>
//       <div className="col-12">
//         <Link to={'/new'}>
//           <div className="card rounded text-center selection-card m-0 mx-5">
//             <h2>New Post</h2>
//             <img
//               className="img-fluid"
//               src={keyboardIcon}
//               alt="searchIcon"
//               style={{ height: '10vh' }}
//             />
//           </div>
//         </Link>
//       </div>
//     </div>
//     <div className="col-md-4 col-12">
//       <div className="col-12">
//         <div className="card text-center p-0 bg-dark-opacity text-dark">
//           <h4>Number of posts</h4>
//           <h1>{this.state.count}</h1>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="card text-center p-0 bg-dark-opacity text-dark">
//           <h4>Last Post</h4>
//           <h1>{this.state.difference}</h1>
//           <h4>days ago</h4>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="card text-center bg-dark-opacity text-dark">
//           <h5>{this.state.quote}</h5>
//           <p>{this.state.author}</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
