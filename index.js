const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect routes
    // TODO: Include wildcard route within protected routes
    // TODO: Using front end framework, you have to send auth token within header
server.use(rjwt({ secret: config.JTW_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    require('./routes/blogs')(server);
    console.log(`Server started on port ${config.PORT}`);
});