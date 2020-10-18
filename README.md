# Your personal journal
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

[![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://github.com/canaryGrapher/Open-Journal/releases/tag/v1.0_stable)
[![GitHub stars](https://img.shields.io/github/stars/Naereen/StrapDown.js.svg?style=social&label=Star&maxAge=2592000)](https://github.com/canaryGrapher/Open-Journal/stargazers)
[!](https://github.com/canaryGrapher/Open-Journal/blob/master/client/src/resources/logo.png?raw=true) 


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

This page also displays a random quote on every refresh, powered by [Quotable](https://github.com/lukePeavey/quotable) by [Luke Peavey](https://github.com/lukePeavey) and weather information for your city.

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
For this project to work, you must have **node** and **npm** installed on your system. To get Open-Journal working on your PC, ```cd``` into the root directory and then ```npm install```. This will install your backend. Now ```cd client``` and then ```npm install``` again. This will install your react app. In the ```config``` folder of your root directory, create a file named ```default.json``` and add the following: 
```
{
      "mongoURI": "YOUR_MONGODB_URI",
      "api_key": "YOUR_OPENWEATHER_API_KEYS"
}
```
After these steps, you will be able to run the application using ```npm start``` in the root directory of the project. Additionally, when deploying on a server, you can build the react app using ```npm run build``` in the ```client``` folder. 

[![Generic badge](https://img.shields.io/badge/NPM-<STATUS>-<COLOR>.svg)](https://shields.io/)
