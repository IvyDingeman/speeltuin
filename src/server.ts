import connectDB from './app/util/connectDB'
import startServer from './app/util/startServer'

connectDB()
	.then(db => startServer())
