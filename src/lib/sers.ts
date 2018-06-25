import { config } from "../config";
import * as jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export function verifyToken(req, res, next) {
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
            if (err) {

                // Token expired
                if ((err as TokenExpiredError).name === 'TokenExpiredError')
                    return res.status(401).send({
                        auth: false,
                        message: err.message
                    })

                // Token error
                return res.status(500).send({
                    auth: false,
                    message: `Failed to authenticate token.Error ${err}`
                })
            }

            // Verified
            // Set id to request and do next() for middleware 
            req.id = decoded.id;
            next();
        });
    }
}