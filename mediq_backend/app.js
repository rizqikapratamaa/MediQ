const express = require('express');
const app = express();
const port = 6000;

app.unsubscribe(express.json());

app.listen(port, () => {
    console.log('server is running at port ', port);
})