const path = require('path')
const express = require('express');

//creating express server
const app = express();

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//use port 3000 unless there exist a preconfigured port
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log(`server running on ${PORT}`)});

