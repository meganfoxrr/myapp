// Importing constants needed for certain functions in index.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs');
const res = require('express/lib/response');
const { stringify } = require('querystring');
const router = express.Router();

// Reading in the json file and parsing so elements can be accessed by index
let rawdata = fs.readFileSync(path.resolve(__dirname, 'favs.json'));
let data = JSON.parse(rawdata);

// Allows for messages to be printed to the console
// Sets localhost to post 3000
app.listen(3000, () => console.log("Running on: http://localhost:3000"));

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

// Sends the index.html file to the localhost
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// code for getting tweets
app.post("/getTweets", function(req, res, next) {
    // iterates through .json file to get every instance of text and created_at
    for (i = 0; i < data.length; i++) {
        res.write(JSON.stringify(data[i].text) + '\n');
        res.write(JSON.stringify(data[i].created_at) + '\n');
    }
    // sends information to new subpage
    res.send();
    next();

});

// code for getting IDs
app.post("/getIDs", function(req, res, next) {
    // iterates through .json file to get every instance of user's ID string
    for(i = 0; i<data.length; i++) {
        res.write(JSON.stringify(data[i].user.id_str) + '\n');
    }
    
    // sends information to new subpage
    res.send();
    next();
});

// code for getting tweet text from inputted tweet ID
app.post("/getTweetDetails", function(req, res, next) {
    // sets local var inputID equal to the inputted ID
    var inputID = JSON.stringify(req.body.tweetID);
    let found = 0;
    let tweetString = "";

    // iterates through .json file
    for (i = 0; i<data.length; i++) {
        // inputted ID and iteration of ID printed to console to compare
        console.log("Inputted ID: " + inputID);
        console.log("Current ID: " + JSON.stringify(data[i].id_str));

        // checks if instance of id_str matches inputted ID
        // if yes, tweetString is updated and the loop is broken
        // prints FOUND! to the console
        if (inputID === JSON.stringify(data[i].id_str)) {
            console.log("FOUND!");
            tweetString = JSON.stringify(data[i].text);
            found = 1;
            break;
        }
    }

    if (found === 1) {
        // sends found tweet to new subpage
        res.send(tweetString);
    }
    else {
        // sends user to new subpage alerting them that no tweet has been found
        res.send("No tweet with this ID found.");
    }
    next();
});

// code for creating tweet with ID
app.post("/createTweet", function(req, res, next) {
    // sets local var tweetText equal to inputted tweet text
    var tweetText = req.body.tweetText;
    // sets local var ID equal to inputted ID
    var ID = req.body.ID;
    // sends inputted data to .json file
    data.push({
        id_str: ID,
        text: tweetText
    });

    // sends user to a subpage alerting them that a new tweet has been created
    res.send("Tweet ID: " + ID + " has been created.");
    next();
});

// code for updating screen name
app.post("/updateScreenName", function(req, res, next) {
    // sets local var name equal to inputted name
    var name = JSON.stringify(req.body.name);
    // sets local var newScreenName equal to inputted screen name
    var newScreenName = req.body.newScreenName;
    var i;
    let found = 0;

    // iterates through json file
    for (i = 0; i<data.length; i++) {
        // prints inputted and current username for user to compare
        console.log("inputted name: " + name);
        console.log(JSON.stringify(data[i].user.name));

        // compares inputted ID to current ID to check if they match
        if (name === JSON.stringify(data[i].user.name)) {
            console.log("FOUND!");
            found = 1;
            // updates matching screen_name in .json file to the new screen name
            data[i].user.screen_name = newScreenName;
            break;
        }
    }

    // sends user to new subpage alerting them of new screen name
    if (found === 1) {
        res.send("New screen name is: " + JSON.stringify(data[i].user.screen_name));
    }
    // alerts user that no person with that name was found
    else {
        res.send("No person with that name was found.");
    }
    next();
});

// code to delete tweet
app.post("/deleteTweet", function(req, res, next) {
    // sets local var ID equal to inputted ID
    var ID = JSON.stringify(req.body.tweetID);
    let found = 0;

    // iterates through .json file
    for (i = 0; i < data.length; i++) {
        // checks if ID matches current ID
        if (ID === JSON.stringify(data[i].id_str)) {
            // splices the data file at the found index
            data.splice(i,1);
            found = 1;
            break;
        }
    }

    // sends user to subpage alerting them that the tweet was deleted
    if (found === 1) {
        res.send("Tweet with ID: " + ID + " was deleted.");
    }
    // alerts user that no tweet with inputted ID was found
    else {
        res.send("Could not find tweet with that ID.");
    }

})



