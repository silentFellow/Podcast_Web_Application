import mongoose from 'mongoose'

const podcastSchema = new mongoose.Schema({
  title: String, 
  description: String, 
  category: String, 
  author: String, 
  authorId: String, 
  posterURL: String, 
  fileURL: String,
}, {
  timestamps: true
})

export default mongoose.model('podcasts', podcastSchema)