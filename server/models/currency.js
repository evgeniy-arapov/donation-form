const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code:{
    type: String,
    unique: true,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  }
}, {
  collection: "currencies"
})

currencySchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Currency', currencySchema)
