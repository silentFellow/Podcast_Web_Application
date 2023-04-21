// imports
import express from 'express'
import users from '../schemas/users.js'

// router set-up
const router = express.Router()

// creating an accout
router.post('/signup', async (req, res) => {
  const { uname, pass } = req.body

  try {
    if(await users.findOne({userName: uname})) {
      res.send('User already exists')
    }
    else {
      await users.create({
        userName: uname, 
        password: pass,
      })
      res.send('Successfullly created')
    }
  }
  catch {
    console.log('something went wrong')
  }
})

// login 
router.post('/login', async (req, res) => {
  const { uname, pass } = req.body

  try {
    if(await users.findOne({ userName: uname })) {
      const currentUser = await users.findOne({ userName: uname })
      const originalpassword = currentUser.password

      if(pass == originalpassword) {
        res.send('Successfully logged in')
      }
      else {
        res.send('Wrong password')
      }
    }
    else {
      res.send('user does not exists')
    }
  }
  catch {
    console.log('Something went wrong')
  }
})

// exports 
export { router as userRouter }