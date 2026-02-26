import express from 'express'
import { getDetails,updateDetails,createDetails,deleteDelails,postLoginDetails,verifyToken } from './userControl.js'

const router = express.Router()

router.get('/',verifyToken, getDetails)
router.post('/',createDetails)
router.put('/:id',updateDetails)
router.delete('/:id',deleteDelails)
router.post('/login',postLoginDetails)

export default router