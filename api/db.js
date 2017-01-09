const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/invoice-react')

const m_util = require('./mongoose-util')

const project_schema = new Schema({
  name: {type: String, required: true, minLength: 1}
}, {
  timestamps: true
})

const client_schema = new Schema({
  name: {type: String, required: true, unique: true, minLength: 1},
  address: {type: String, required: true, minLength: 1},
  address2: String,
  city: {type: String, required: true, minLength: 1},
  state: {type: String, required: true, minLength: 1},
  zip: {type: String, required: true, minLength: 1},
  country: {type: String, required: true, minLength: 1},
  phone: {type: String, required: true, minLength: 1},
  email: {type: String, required: true, minLength: 1},
  projects: [project_schema]
}, {
  timestamps: true
})

client_schema.pre('save', function(next){
  var names = this.projects.map((p) => p.name)

  if (new Set(names).size != names.length){
    next(m_util.create_error('ValidationError', 'name', 'Not unique'))
  }
  else {
    next()
  }
})
//client_schema.plugin(uniqueValidator)

exports.Client = mongoose.model('Client', client_schema)

