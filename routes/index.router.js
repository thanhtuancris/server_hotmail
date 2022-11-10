const data_checked = require('./data_checked.router');
const data_not_checked = require('./data_not_checked.router');
function routes(app) {
    app.use('/api', data_checked);
    app.use('/api', data_not_checked);
}

module.exports = routes;