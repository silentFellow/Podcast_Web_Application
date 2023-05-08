// imports
import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import users from '../schemas/users.js'

// router set-up
const router = express.Router()

// creating an account
router.post('/signup', async (req, res) => {
  const { uname, pass, google } = req.body

  const findUser = await users.findOne({userName: uname})

  try {
    if(findUser) {
      res.status(201).send('User already exists')
    }
    else {
      await users.create({
        userName: uname, 
        password: pass,
        google
      })
      res.status(200).send('Successfullly created')
    }
  }
  catch(err) {
    console.log('something went wrong')
    console.log(err)
  }
})

// login 
router.post('/login', async (req, res) => {
  const { uname, pass, google } = req.body
  const user = await users.findOne({ userName: uname })

  try {
    if(user) {
      const currentUser = await users.findOne({ userName: uname })
      const originalpassword = currentUser.password

      if(pass == originalpassword && google == currentUser.google) {
        const access_token = jwt.sign({ user_id: currentUser._id }, 'secret')
        res.status(200).send({
          token: access_token, 
          uid: currentUser._id, 
          userName: currentUser.userName, 
          my_collection: currentUser.my_collection, 
          favourites: currentUser.favourites
        })
      }
      else {
        res.status(201).send('Wrong password')
      }
    }
    else {
      res.status(201).send('user does not exists')
    }
  }
  catch {
    console.log('Something went wrong')
  }
})

// poster update 
router.post('/update', async (req, res) => {
  const { uid, newCollection } = req.body
  try {
    const currentUser = await users.findById(uid)
    const favSet = new Set(currentUser.favourites)

    if(favSet.has(newCollection)) {
      const dataUpdate = await users.findByIdAndUpdate(uid, {
        $pull: {
          favourites: newCollection
        }
      })
    }
    else {
      const dataUpdate = await users.findByIdAndUpdate(uid, {
        $push: {
          favourites: newCollection
        }
      })
    }

    res.status(200).send('Uploaded Successfully')
  }
  catch(err) {
    console.log(err)
    res.status(201).send('Something went wrong')
  }
})

// prof 
router.get('/profile', async (req, res) => {
  const { uid } = req.query

  const data = await users.findById( uid )
  res.status(200).send(data)
})

// exports 
export { router as userRouter }