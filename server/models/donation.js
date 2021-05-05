const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency:{
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: "donations"
})


module.exports = mongoose.model('Donation', donationSchema)
