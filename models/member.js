//  npx express-generator
// npm i
// npm i mongoose
//npm i nodemon ejs
//npm i bycript cors

const mongoose = require('mongoose')

const schema = mongoose.Schema

const memberSchema = new schema({
  membername: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  }

}, { timestamps: true }
)

const Member = mongoose.model('Members', memberSchema)
module.exports = Member