import { Router } from 'express'

const router = Router()

router.get('*', (req, res) => res.send('test'))			// TODO: use playground auth middleware

export default router
