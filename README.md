# How to Use and Run myapp Program
## The myapp program consists of:
| File        | Description |
| ------------|-------------|
| app.js      | implements app in javascript      |
| favs.json   | contains and stores all the tweet information       |
| index.js    | backend server implementing functions called in html file; reads & writes to .json|
| index.html  | front end webpage containing buttons and input fields |

### To Run the Program:
1. Navigate to myapp directory via command line (cd myapp)
2. To run the program, type "node index.js" to run the backend via command line
3. Navigate to localhost:3000 in a browser
4. You can now interact with the webpage's buttons and input fields

#### Some Notes:
- When a submit button is clicked on the webpage, you will be taken to a subpage to see the result. You can click the back arrow to navigate back to the home page without losing the data you have inputted/deleted/changed.
- As per project guidelines, newly created tweets only contain the tweet text and ID.