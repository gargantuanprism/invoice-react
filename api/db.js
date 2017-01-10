const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/invoice-react')

const m_util = require('./mongoose-util')

const projectSchema = new Schema({
  name: {type: String, required: true, minLength: 1}
}, {
  timestamps: true
})

const clientSchema = new Schema({
  name: {type: String, required: true, unique: true, minLength: 1},
  address: {type: String, required: true, minLength: 1},
  address2: String,
  city: {type: String, required: true, minLength: 1},
  state: {type: String, required: true, minLength: 1},
  zip: {type: String, required: true, minLength: 1},
  country: {type: String, required: true, minLength: 1},
  phone: {type: String, required: true, minLength: 1},
  email: {type: String, required: true, minLength: 1},
  projects: [projectSchema]
}, {
  timestamps: true
})

clientSchema.pre('save', function(next){
  var names = this.projects.map((p) => p.name)

  if (new Set(names).size != names.length){
    next(m_util.create_error('ValidationError', 'name', 'Not unique'))
    return
  }

  next()
})

const invoiceItemSchema = new Schema({
  desc: {type: String, required: true, minLength: 1},
  hours: Number,
  rate: Number,
  amount: Number,
  type: {type: String, enum: ['Hourly Work', 'Fee', 'Deposit', 'Expense']},
  project: {type: Schema.Types.ObjectId, required: true, ref: 'Project'}
}, {
  timestamps: true
})

const invoiceSchema = new Schema({
  desc: {type: String, required: true, minLength: 1},
  client: {type: Schema.Types.ObjectId, required: true, ref: 'Client'},
  slug: {type: String, required: true, minLength: 1},
  paid: {type: Boolean, default: false},
  invoiceItems: [invoiceItemSchema]
}, {
  timestamps: true
})

exports.Client = mongoose.model('Client', clientSchema)
exports.Invoice = mongoose.model('Invoice', invoiceSchema)

