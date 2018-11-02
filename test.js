const tzframe = require('./index');

tzframe.boot(__dirname).then(function() {
  tzframe.configs()._configs.test.load();
  console.log(tzframe.configs()._configs.test);
});
