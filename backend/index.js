import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './userRoute.js'
import cors from 'cors'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.MONGO_DB_CONNECTION_URL

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use('/api/userDetails', userRoute)

mongoose.connect(DB_URL)
  .then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))