import express from 'express';
import path from 'path';
var app = express();
var __dirname = path.resolve();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, function () { return console.log("Listening on " + PORT); });
