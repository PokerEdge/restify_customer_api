const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
    
    // Register User
    server.post('/register', (req, res, next) => {
        const { email, username, password } = req.body;

        // User registration data passed in from Postman, Angular, React, etc.
        const user = new User({
            email,
            username,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                
                // Hash password
                user.password = hash;
                
                // Save user
                try {
                    const newUser = await user.save();
                    res.send(201); // Created with success
                    next();
                } catch(err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });

    // Auth User
    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        
        try {
            // Authentication User
            const user = await auth.authenticate(email, password);
            
            // Create JWT
            const token = jwt.sign(user.toJSON(), config.JTW_SECRET, {
                expiresIn: '15m'
            });

            // Respond with token to be used along with protected routes
            const { iat, exp } = jwt.decode(token);
            res.send({ iat, exp, token });
            next();
        } catch (err) {
            // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    });
};
