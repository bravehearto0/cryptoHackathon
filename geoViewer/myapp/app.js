const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('Healthy!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));