# Figleaf
Super simple, lightweight configuration loader

## Why another configuration loader?

There are a lot of good configuration management packages for Node.js - such as nconf, and node-config - and I'd recommend checking some of those out to see whether they suit you.

Figleaf is designed to meet my desire for a super simple JSON configuration loader that also allows me to store my production configurations in separate location to my code base, but to not require painful amounts of environment variable setting, or not handling different machine configurations well.

Basically, Figleaf simply allows you to check for the existence of a single environment variable containing the path to your application configurations, and if that doesn't exist, then run down a list of supplied paths checking for the presence of configuration files.

If all else fails, Figleaf simply adopts the practice of looking for config files in the /config directory of the current working direction.

## Usage

```
/** Load the config, checking first in the FIGLEAF_CONFIG environment variable, then examining the paths given, then checking the {cwd}/config director
 **/
var config = require('figleaf')({ env: 'FIGLEAF_CONFIG', paths: [__dirname + '/myconfigs']});

// Configs are cached
config = require('figleaf')();

// Force a refresh
config = require('figleaf')({ env: 'FIGLEAF_CONFIG', paths: [__dirname + '/myconfigs'], refresh: true });

// If loading Javascript configuration files, pass extension
var config = require('figleaf')({ env: 'FIGLEAF_CONFIG', paths: [__dirname + '/myconfigs'], extension: 'js' });

```

## Configuration Files

Configuration files can be JSON or Javascript. The first file looked for will be ```default```, which will then be extended with an environment specific configuration (if available) that matches the current value of process.env.NODE_ENV (or development if none is set)


## License
MIT