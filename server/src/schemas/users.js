import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String, 
  },
  password: {
    type: String,
  }, 
  google: Boolean, 
  my_collection: [{}], 
  favourites: [{}]
})

export default mongoose.model('users', userSchema)