import mongoose from 'mongoose'

const podcastSchema = new mongoose.Schema({
  author: String, 
  title: String, 
  posterURL: String, 
  fileURL: String,
}, {
  timestamps: true
})

export default mongoose.model('podcasts', podcastSchema)