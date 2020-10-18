# Your personal journal

![](https://github.com/canaryGrapher/Open-Journal/blob/master/client/src/resources/logo.png?raw=true) 

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg?color=red&style=for-the-badge)](https://github.com/canaryGrapher/Open-Journal/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/canaryGrapher/Open-Journal?style=for-the-badge)](https://github.com/canaryGrapher/Open-Journal/releases/tag/v1.0_stable/)
[![Github stars](https://img.shields.io/github/stars/canaryGrapher/Open-Journal?style=for-the-badge)](https://github.com/canaryGrapher/Open-Journal/stargazers)
[![Github forks](https://img.shields.io/github/forks/canaryGrapher/Open-Journal?style=for-the-badge)](https://github.com/canaryGrapher/Open-Journal/network/members)
[![Github issues](https://img.shields.io/github/issues/canaryGrapher/Open-Journal?style=for-the-badge)](https://github.com/canaryGrapher/Open-Journal/issues)

If you have been looking for an e-journal for yourself and haven't had any luck, you have come to the right place. This project was created with the purpose of having your personal blogging application running, for only you to access, on your own machine, or on your local server. 

## What can you do with Open-Journal?
 - Create a new post
 - Edit an existing post
 - Remove an existing post
 - Search older posts
 
 
 ### Homepage
 The homepage consists of some useful stats on your post activity. It tells you how many posts have you made, and when was the last time you made a post.
 There are three links on this page -
  - Post page: View all the posts you have ever made
  - New Post page: Create a new post
  - Search page: Search the posts you have made to delete, edit or view it.
    
 ![](https://live.staticflickr.com/65535/50476947451_130b506484_b.jpg)

This page also displays a random quote on every refresh, powered by [Quotable](https://github.com/lukePeavey/quotable) by [Luke Peavey](https://github.com/lukePeavey) and weather information for your city. The background image changes with respect to the day. All images were grabbed from [Unsplash](https://unsplash.com/).

#Note: Change the city name for weather info on line 57 of [home.js](https://github.com/canaryGrapher/Open-Journal/edit/master/client/src/components/Home.js).You will also need an API key for this to work. You can get a free one on [home.openweathermap.org](https://home.openweathermap.org/)

### New Post Page
Create new post using this page. Default title is the the date. You can chage it to your liking, or leave it as it is. You can aso add an image for the post. The body of the post oes not take any kind of formatting, like new line, bold, italics or strikethrough. 

![](https://live.staticflickr.com/65535/50500506738_66db74f41b_c.jpg)

Duplicate titles are allowed, but you can change that by adding ```unique: true``` in the mongoose [models](https://github.com/canaryGrapher/Open-Journal/blob/master/models/Record.js) to the ```title``` object, after ```required: true```.

### Search page
Search page allows you to search your older posts with partial texts from the title or the body, or with the date you created the post. 

![](https://live.staticflickr.com/65535/50501752238_d52e7954be_c.jpg)

### Posts page
All posts that you created will be displayed here. 


## How to setup your open-journal?
[![made-with-Node](https://img.shields.io/badge/Made%20with-ReactJS-1f425f.svg?style=for-the-badge)](http://golang.org)
[![made-with-React](https://img.shields.io/badge/Made%20with-NodeJS-1f425f.svg?style=for-the-badge)](http://golang.org)

For this project to work, you must have **node** and **npm** installed on your system. To get Open-Journal working on your PC, ```cd``` into the root directory and then ```npm install```. This will install your backend. Now ```cd client``` and then ```npm install``` again. This will install your react app. In the ```config``` folder of your root directory, create a file named ```default.json``` and add the following: 
```
{
      "mongoURI": "YOUR_MONGODB_URI",
      "api_key": "YOUR_OPENWEATHER_API_KEYS"
}
```
After these steps, you will be able to run the application using ```npm start``` in the root directory of the project. Additionally, when deploying on a server, you can build the react app using ```npm run build``` in the ```client``` folder. 

The backend runs on port ```5000``` and the react-app runs on port ```3000```, so open your ports accordingly. You can change these ports in ```server.js``` file of the backend and individually in each component of react in the ```components``` folder.


## Additional features
You can use the [Companion CLI app](https://github.com/canaryGrapher/Open-Journal-companion-cli) to create posts from your terminal/command-prompt.

Upcoming features:
 - Login system for authorized access.
 - Better Post page UI (Suggestions are welcome)

## How to contribute
Please raise an issue and clearly mention it along with screenshots, if possible, and the steps to reproduce it. I shall fix it in a couple of days if I am not busy with other work. Issues can also include feature update suggestion. 

You are more than welcome to contribute to the project. I am looking for active contributors and maintainers for this project. 


## Made with
These are the technologies used to make this project.

[![Generic badge](https://img.shields.io/badge/npm-^6.12.0-red.svg?style=for-the-badge)](https://www.npmjs.com/)
[![Generic badge](https://img.shields.io/badge/NodeJS-^12.0.0-green.svg?style=for-the-badge)](https://nodejs.org/)
[![Generic badge](https://img.shields.io/badge/ReactJS-^16.13.1-blue.svg?style=for-the-badge)](https://reactjs.org/)
[![Generic badge](https://img.shields.io/badge/Halmoon-^1.1.1-yellow.svg?style=for-the-badge)](https://www.gethalfmoon.com/)
[![Generic badge](https://img.shields.io/badge/Mongoose-^5.10.8-red.svg?style=for-the-badge)](https://mongoosejs.com/)
[![Generic badge](https://img.shields.io/badge/Axios-^0.20.0-red.svg?style=for-the-badge)](https://mongoosejs.com/)
[![Generic badge](https://img.shields.io/badge/React%20Router-^5.2.0-red.svg?style=for-the-badge)](https://reactrouter.com/)
