const {Command, flags} = require('@oclif/command')
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })

class SumologicCommand extends Command {
  async run() {
    const {flags} = this.parse(SumologicCommand)
    const team = flags.team || 'world'
    this.log(`hello ${team} from /Users/erikrist/git/heroku-drains/src/commands/add/sumologic.js`)
    heroku.get('/apps').then(apps => {
      apps.forEach((app) => this.log(app.name))
    })
  }
}

SumologicCommand.description = `Create and add Sumologic log drains to all apps in a Heroku team.
This will create a Sumologic "HTTP Logs and Metrics" source for each of the apps in the Heroku team.
The URL for the corresponding source will be added as a log drain to the corresponding Heroku app.
`

SumologicCommand.flags = {
  team: flags.string({char: 't', description: 'Heroku team where sumologic drains will be added.'}),
  collector: flags.string({char: 'c', description: 'Sumologic collector which will be used.'}),
  category: flags.string({char: 's', description: 'Source category which these collectors will be added to.'}),
}

module.exports = SumologicCommand
