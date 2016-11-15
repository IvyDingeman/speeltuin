import * as express from 'express'
import apirouter from '../router/api'
import adminrouter from '../router/admin'
import config from '../../config'

const app = express()

app.use('/api', apirouter)
app.use('/admin', adminrouter)

export default () => Promise.resolve(
	app.listen(config.port, () => console.log('listening on 3000')))
