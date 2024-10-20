// npx express-generate 
// npm i
// npm i mongoose cors

const mongoose = require('mongoose')

const schema = mongoose.Schema

const brandSchema = new schema(
  { brandName: String},
  { timestamps: true, }
);



const Brand = mongoose.model('Brands', brandSchema)
module.exports = Brand