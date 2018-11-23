const {Command, flags} = require('@oclif/command')
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const axios = require('axios');
const sumologic = axios.create({
   baseURL: process.env.SUMOLOGIC_URL || 'https://api.sumologic.com/',
   auth: {
     username: process.env.SUMOLOGIC_ACCESS_ID,
     password: process.env.SUMOLOGIC_ACCESS_KEY
   } 
})
 
class SumologicCommand extends Command {
  async run() {
    const {flags} = this.parse(SumologicCommand)
    const collectorName = flags.collector
    const teamName = flags.team
    sumologic.get('api/v1/collectors')
      .then(response => {
        const collectors = response.data.collectors;
        console.log(collectors);
        const collector = collectors.filter(coll => coll.name === collectorName)[0]
        console.log(collector)
        sumologic.get('/api/v1/collectors/' + collector.id + '/sources')
          .then(response => {
            const sources = response.data.sources;
            console.log(sources)
          })
      })
    heroku.get('/teams/' + teamName + '/apps').then(apps => {
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
