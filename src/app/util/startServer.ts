import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import apirouter from '../router/api'
import adminrouter from '../router/admin'
import config from '../../config'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', express.static(config.public))
app.use('/theme', express.static(config.root + 'node_modules/gentelella'))
app.use('/api', apirouter)

export default () => Promise.resolve(
	app.listen(config.port, () => console.log(`listening on ${config.port}`)))
