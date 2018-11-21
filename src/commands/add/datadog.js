const {Command, flags} = require('@oclif/command')

class DatadogCommand extends Command {
  async run() {
    const {flags} = this.parse(DatadogCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/erikrist/git/heroku-drains/src/commands/add/datadog.js`)
  }
}

DatadogCommand.description = `Describe the command here
...
Extra documentation goes here
`

DatadogCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DatadogCommand
