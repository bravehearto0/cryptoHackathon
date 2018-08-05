const express = require('express');
const app = express();

var dirname = process.cwd()

app.get('/health', (req, res) => res.send('OK'));
app.use(express.static('static'));
app.use(express.static('data'));
app.get('/pokey', function(req, res) {
    res.sendFile(dirname + '/static/pokey.html');
});

app.listen(8088);
