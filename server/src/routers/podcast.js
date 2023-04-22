// imports
import express from 'express'
import podcast from '../schemas/podcast.js'

// router set-up
const router = express.Router()

// router func
router.post('/post', async (req, res) => {
  const { author, title, posterURL, fileURL } = req.body

  try {
    if(await podcast.findOne({ fileURL })) {
      res.status(201).send('File Already Exists')
    }
    else {
      await podcast.create({
        author, 
        title, 
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
  const { key, value } = req.query
  try {
    if(key == '' || value == '') {
      const data = await podcast.find()
      res.status(200).send(data)
    }
    else {
      const data = await podcast.find({ key: value })
      res.status(200).send(data)
    }
  }
  catch {
    res.status(201).send(data)
  }
})

router.post('/update', async (req, res) => {
  const { id, author, title, posterURL, fileURL } = req.body

  try {
    await podcast.findOneAndUpdate({ _id: id }, {
      author, 
      title, 
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