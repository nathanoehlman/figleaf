const _ = require('lodash');
const path = require('path');
const fs = require('fs');

let config;
module.exports = opts => {

  opts = opts || {};
  if (config && !opts.refresh) return config;

  let searchPaths = []
  const environment = process.env.NODE_ENV || 'development';

  if (opts.env && process.env[opts.env]) searchPaths.push(process.env[opts.env]);
  if (opts.paths) searchPaths = searchPaths.concat(opts.paths);
  searchPaths.push(path.join(process.cwd(), 'config'));

  const foundPath = _.find(searchPaths, configPath => fs.existsSync(configPath));
  if (!foundPath) throw new Error('No configuration paths found');

  const configFiles = [];
  ['default.json', environment + ('.' + (opts.extension || 'json'))].forEach(filename => {
    const filepath = path.join(foundPath, filename);
    if (fs.existsSync(filepath)) {
      configFiles.push(path.join(foundPath, filename));
    }
  });
  if (configFiles.length === 0) throw new Error('No configuration files found');

  // read the local configuration files and override as appropriate
  config = _.merge.apply(_, [{}].concat(configFiles.map(require)));
  return config;
}