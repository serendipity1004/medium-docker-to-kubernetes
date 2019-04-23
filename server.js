const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json({
        success: true
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});