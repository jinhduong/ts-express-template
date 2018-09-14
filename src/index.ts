import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as  exphbs from'express-handlebars';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));


app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => console.log(`Server running at ${port}`));