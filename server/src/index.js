// imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import http from 'http'
import { userRouter } from './routers/users.js'
import { PodcastRouter } from './routers/podcast.js'
import podcast from './schemas/podcast.js'

// app init
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: []
})
/* io.on('connection', socket => console.log(socket.id)) */

// middleware
app.use(express.json())
app.use(cors())

// mongoose
const BASE_URL = 'mongodb+srv://silentFellow:SGM02468@podcastapp.4lapmiu.mongodb.net/test'
mongoose.connect(BASE_URL)

const db = mongoose.connection

db.once('open', () => {
  console.log('yo database is connectted succesfully...')

  const options = 'FullDocument = ChangeStreamFullDocumentOption.BASE_URLUpdateLookup'

  const userChange = db.collection('users').watch({options})
  const podcastChange = db.collection('podcasts').watch()

  /* io.on('connection', socket => console.log('connection established')) */

  userChange.on('change', async (change) => {
    if(change.operationType === 'update') {
      io.emit('user', {
        id: change.documentKey._id
      })
    }
  })

  podcastChange.on('change', (change) => {
    if(change.operationType === 'insert') {
      io.emit('message', {
        type: 'podcastInsert', 
        data: change.fullDocument
      })
    }
    else if(change.operationType === 'update') {
      io.emit('message', {
        type: 'podcastUpdate', 
        id: change.documentKey._id
      })
    }
  })
})

// app useage
app.use('/register', userRouter)
app.use('/podcast', PodcastRouter)

// app listening
const PORT = 9999
server.listen(PORT, () => console.log(`Server started at http://locathost:${PORT}`))