var _ = require('lodash');

var localEnvVars = {
  TITLE:      'broadway_bound',
  SAFE_TITLE: 'broadway_bound'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
