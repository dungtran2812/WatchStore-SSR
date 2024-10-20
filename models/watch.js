// npx express-generate 
// npm i
// npm i mongoose cors

const mongoose = require('mongoose')

const schema = mongoose.Schema

const watchSchema = new schema({
    watchName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    Automatic: {
        type: Boolean,
        default: false
    },
    watchDescription: {
        type: String,
        require: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
        require: true
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brands",
        require: true
    },
}, { timestamps: true, });


const Watch = mongoose.model('Watchs', watchSchema)
module.exports = Watch