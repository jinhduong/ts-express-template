import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as userController from './ctrls/user.ctrl';
import { config } from './config';
import { verifyToken } from './lib/sers';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.json('Hello world');
});

// Validate with router
app.use('/api/users', verifyToken, userController);

// Get token
app.get('/token', async (req, res) => {

    // This account maybe get from your db or login
    const dumbUser = {
        id: 'hwyfhf1321',
        username: 'simplename'
    }

    // Create the token
    const token = jwt.sign({
        id: dumbUser.id,
        usn: dumbUser.username
    }, config.secret, {
            expiresIn: 24 * 12 * 40 // expires in 24 hours
        });

    res.status(200).send({
        auth: true,
        token: token
    })
});

// Validate in incoming funtion
app.get('/me-mw', verifyToken, (req, res, next) => {
    const id: string = (req as any).id;
    res.status(200).json(id);
});

// Directly verify
app.get('/me', async (req, res) => {

    // If dont have authorization data
    if (!req.headers['authorization'])
        return res.status(401).json('need access token');

    // Verify
    const authData = req.headers['authorization'];
    if (authData.split(' ')[0].toLowerCase() === 'bearer') {
        const token = authData.split(' ')[1];

        // If token is invalid
        if (!token) return res.status(401).json('invalid access token');

        jwt.verify(token, config.secret, (err, decoded) => {

            // If throw error
            if (err) return res.status(500).send({
                auth: false,
                message: `Failed to authenticate token.Error ${err}`
            })

            // Verified
            res.status(200).send(decoded);
        });
    }
});

app.listen(port, () => console.log(`Server running at ${port}`));