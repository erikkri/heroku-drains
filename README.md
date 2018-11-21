heroku-drains
=============

Tool to add log drains to multiple Heroku apps.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-drains.svg)](https://npmjs.org/package/heroku-drains)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-drains.svg)](https://npmjs.org/package/heroku-drains)
[![License](https://img.shields.io/npm/l/heroku-drains.svg)](https://github.com/erikkri/heroku-drains/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g heroku-drains
$ heroku-drains COMMAND
running command...
$ heroku-drains (-v|--version|version)
heroku-drains/0.0.0 darwin-x64 node-v10.8.0
$ heroku-drains --help [COMMAND]
USAGE
  $ heroku-drains COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku-drains add:datadog`](#heroku-drains-adddatadog)
* [`heroku-drains add:sumologic`](#heroku-drains-addsumologic)
* [`heroku-drains help [COMMAND]`](#heroku-drains-help-command)

## `heroku-drains add:datadog`

Describe the command here

```
USAGE
  $ heroku-drains add:datadog

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/add/datadog.js](https://github.com/erikkri/heroku-drains/blob/v0.0.0/src/commands/add/datadog.js)_

## `heroku-drains add:sumologic`

Create and add Sumologic log drains to all apps in a Heroku team.

```
USAGE
  $ heroku-drains add:sumologic

OPTIONS
  -c, --collector=collector  Sumologic collector which will be used.
  -s, --category=category    Source category which these collectors will be added to.
  -t, --team=team            Heroku team where sumologic drains will be added.

DESCRIPTION
  This will create a Sumologic "HTTP Logs and Metrics" source for each of the apps in the Heroku team.
  The URL for the corresponding source will be added as a log drain to the corresponding Heroku app.
```

_See code: [src/commands/add/sumologic.js](https://github.com/erikkri/heroku-drains/blob/v0.0.0/src/commands/add/sumologic.js)_

## `heroku-drains help [COMMAND]`

display help for heroku-drains

```
USAGE
  $ heroku-drains help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
