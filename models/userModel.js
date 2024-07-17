const mongoose= require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, // Set your desired default role value here
    },
    secretQuestion: {
      type: String,
      required: true,
    },
    secretAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model('users',userSchema)