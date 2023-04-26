// imports
import express from 'express'
import podcast from '../schemas/podcast.js'

// router set-up
const router = express.Router()

// router func
router.post('/post', async (req, res) => {
  const { title, description, category, author, authorId, posterURL, fileURL } = req.body

  try {
    if(await podcast.findOne({ fileURL })) {
      res.status(201).send('File Already Exists')
    }
    else {
      await podcast.create({
        title, 
        description, 
        category, 
        author, 
        authorId, 
        posterURL, 
        fileURL
      })
      res.status(200).send('Uploaded Successfully')
    }
  }
  catch {
    res.status(201).send('Something went wrong')
  }
})

router.get('/get', async (req, res) => {
  try {
    const data = await podcast.find()
    res.status(200).send(data)
  }
  catch {
    res.status(201).send('something went wrong')
  }
})

router.post('/update', async (req, res) => {
  const { uid, author, authorId, title, posterURL, fileURL } = req.body

  try {
    await podcast.findByIdAndUpdate( uid , {
      title, 
      description, 
      category, 
      author, 
      authorId, 
      posterURL, 
      fileURL
    })

    res.status(200).send('Updated successful')
  }
  catch {
    res.send('Something went wrong')
  }
})

// exports
export { router as PodcastRouter }