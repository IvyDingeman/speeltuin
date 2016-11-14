import * as express from 'express'
import router from '../router'
import config from '../../config'

const app = express()

app.use('/api', router)

export default () => Promise.resolve(
	app.listen(config.port, () => console.log('listening on 3000'))
)

