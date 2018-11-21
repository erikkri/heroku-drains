const {Command, flags} = require('@oclif/command')

class SumologicCommand extends Command {
  async run() {
    const {flags} = this.parse(SumologicCommand)
    const team = flags.team || 'world'
    this.log(`hello ${team} from /Users/erikrist/git/heroku-drains/src/commands/add/sumologic.js`)
  }
}

SumologicCommand.description = `Create and add Sumologic log drains to all apps in a Heroku team.
This will create a Sumologic "HTTP Logs and Metrics" source for each of the apps in the Heroku team.
The URL for the corresponding source will be added as a log drain to the corresponding Heroku app.
`

SumologicCommand.flags = {
  team: flags.string({char: 't', description: 'Heroku team where sumologic drains will be added.'}),
  collector: flags.string({char: 'c', description: 'Sumologic collector which will be used.'}),
  team: flags.string({char: 's', description: 'Source category which these collectors will be added to.'}),
}

module.exports = SumologicCommand
