const express = require('express');

const path = require('path');
const app = express();

// If we are in production (Heroku), process.env.PORT is true, 
// If we are in development it is false, default to 3000
const PORT = process.env.PORT || 3000;

 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'notes.html'));
// });


app.use(express.static('public'));


var routes = require("./routes");
routes(app)

app.listen(PORT, function(){
    console.log("this app is running on http://localhost:"+PORT);
});