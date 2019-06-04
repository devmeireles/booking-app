const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('<YOUR MONGO CONFIG>', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose
