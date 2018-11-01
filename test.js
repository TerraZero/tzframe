const tzframe = require('./index');

tzframe.boot(__dirname).then(function() {
  console.log('ready');
});
