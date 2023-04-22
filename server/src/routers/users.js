// imports
import express from 'express'
import jwt from 'jsonwebtoken'
import users from '../schemas/users.js'

// router set-up
const router = express.Router()

// creating an accout
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
  catch {
    console.log('something went wrong')
  }
})

// login 
router.post('/login', async (req, res) => {
  const { uname, pass, google } = req.body

  try {
    if(await users.findOne({ userName: uname })) {
      const currentUser = await users.findOne({ userName: uname })
      const originalpassword = currentUser.password

      if(pass == originalpassword && google == currentUser.google) {
        const access_token = jwt.sign({ user_id: currentUser._id }, 'secret')
        res.status(200).send({
          token: access_token, 
          uid: currentUser._id, 
          userName: currentUser.userName, 
          myCollectio: currentUser.myCollection, 
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

// exports 
export { router as userRouter }