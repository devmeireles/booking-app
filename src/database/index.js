const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('<YOUR MONGO CONFIG>', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose
