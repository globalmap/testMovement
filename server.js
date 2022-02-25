const express = require('express');
const path = require('path');

const app = express();
const dirname = path.resolve();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(express.static(path.join(dirname, 'build')));


app.get('*', function (req, res) {
    res.sendFile(path.join(dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));