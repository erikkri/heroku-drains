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

async function getCollector(name) {
  console.log(name)
  const response = await sumologic.get('api/v1/collectors')
  const collectors = response.data.collectors;
  console.log(collectors)
  const filteredCollectors = collectors.filter(coll => coll.name === name)
  if (filteredCollectors.length < 1) {
    console.log('No such collector.')
    process.exit(1)
  }
  const collector = filteredCollectors[0]
  return collector
}

async function getSources(collectorId) {
  const response = await sumologic.get('/api/v1/collectors/' + collectorId + '/sources')
  return response.data.sources
}

async function createSource(name) {
  console.log('Creating source with name: ' + name)
}

async function addDrain(appName, sourceURL) {
  console.log('Adding drain for ' + appName + ' with url: ' + sourceURL)
}
class SumologicCommand extends Command {
  async run() {
    const {flags} = this.parse(SumologicCommand)
    const collectorName = flags.collector
    const teamName = flags.team
    const collector = await getCollector(collectorName)
    const sources = await getSources(collector.id)
    console.log(sources)
    const apps = await heroku.get('/teams/' + teamName + '/apps')
    apps.forEach((app) => {
      console.log(app.name)
      const appSource = sources.filter(source => source.name === app.name)
      if (appSource.length<1) {
        // No source with that name, create it.
        const newSource = createSource(app.name)
        addDrain(app.name, "newSource.url")
      } else {
        const source = appSource[0];
        addDrain(app.name, "source.url")
      }
    })
  }
}

SumologicCommand.description = `Create and add Sumologic log drains to all apps in a Heroku team.
This will create a Sumologic "HTTP Logs and Metrics" source for each of the apps in the Heroku team.
The URL for the corresponding source will be added as a log drain to the corresponding Heroku app.
`

SumologicCommand.flags = {
  team: flags.string({char: 't', description: 'Heroku team where sumologic drains will be added.', required: true}),
  collector: flags.string({char: 'c', description: 'Sumologic collector which will be used.', required: true}),
  category: flags.string({char: 's', description: 'Source category which these collectors will be added to.'}),
}

module.exports = SumologicCommand
