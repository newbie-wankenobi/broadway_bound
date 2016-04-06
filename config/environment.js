var _ = require('lodash');

var localEnvVars = {
  TITLE:      'broadway_bound',
  SAFE_TITLE: 'broadway_bound'
};

module.exports = _.extend(process.env, localEnvVars);
