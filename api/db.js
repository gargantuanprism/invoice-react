const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/invoice-react')

const client_schema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  address2: String,
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  country: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true}
}, {
  timestamps: true
})

exports.Client = mongoose.model('Client', client_schema)

