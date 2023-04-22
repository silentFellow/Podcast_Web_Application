// imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routers/users.js'
import { PodcastRouter } from './routers/podcast.js'

// app init
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// mongoose
const BASE_URL = 'mongodb+srv://silentFellow:SGM02468@podcastapp.4lapmiu.mongodb.net/test'
mongoose.connect(BASE_URL)
mongoose.connection.once('open', () => console.log('yo database is connectted succesfully...'))

// app useage
app.use('/register', userRouter)
app.use('/podcast', PodcastRouter)

// app listening
const PORT = 9999
app.listen(PORT, () => console.log(`App started at http://locathost:${PORT}`))