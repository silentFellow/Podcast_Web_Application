// imports
import express from 'express'
import podcast from '../schemas/podcast.js'

// router set-up
const router = express.Router()

// router func
// podcast upload
router.post('/post', async (req, res) => {
  const { title, description, category, author, authorId, posterURL, fileURL } = req.body

  try {
    const data = await podcast.create({
      title, 
      description, 
      category, 
      author, 
      authorId, 
      posterURL, 
      fileURL
    })
    res.status(200).send(data)
  }
  catch(err) {
    console.log(err)
    res.status(201).send('Something went wrong')
  }
})

// podcast find => reduce multiple if else with obj of func
router.get('/get', async (req, res) => {
  const { key, value } = req.query
  
  try {
    const search = {
      '': podcast.find(), 
      'category': podcast.find({ category: value }), 
      'authorId': podcast.find({ authorId: value }), 
      'id': podcast.find({ _id: { $in: value } })
    }
    const data = await search[key]
    res.status(200).send(data)
  }
  catch(err) {
    console.log(err)
    res.status(201).send('something went wrong')
  }
})

// podcast update
router.post('/update', async (req, res) => {
  const { uid, title, description, author, posterURL } = req.body

  try {
    await podcast.findByIdAndUpdate( uid , {
      title, 
      description, 
      author, 
      posterURL
    })

    res.status(200).send('Updated successful')
  }
  catch {
    res.send('Something went wrong')
  }
})

// podcast delete
router.get('/delete', async (req, res) => {
  const { uid } = req.query

  try {
    const data = await podcast.findByIdAndRemove( uid )

    res.status(200).send('Deleted Successfully')
  }
  catch(err) {
    console.log(err)
    res.status(201).send('Something went wrong')
  }
})

// exports
export { router as PodcastRouter }