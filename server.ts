import express from 'express';
import path from 'path';

const app: any = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));