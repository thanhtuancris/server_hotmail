const hotmail = require('./hotmail.router');
function routes(app) {
    app.use('/api', hotmail);
}

module.exports = routes;