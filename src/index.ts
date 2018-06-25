import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.json(true);
})

app.listen(port, () => console.log(`Server running at ${port}`));