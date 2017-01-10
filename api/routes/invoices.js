const express = require('express')
const createError = require('http-errors')

const Invoice = require('../db').Invoice

const router = express.Router()
router.use('/:invoice_id/invoice_items', require('./invoice-items'))

router.param('invoice_id', (req, res, next, invoice_id) => {
  Invoice.findById(invoice_id)
    .populate('client')
    .then(doc => {
      if (doc){
        req.invoice = doc
        next()
      }
      else {
        next(createError(404))
      }
    })
    .catch(err => next(err))
})

router.get('/', (req, res, next) => {
  Invoice.find({})
    .populate('client')
    .then(docs => res.json(docs))
    .catch(err => next(err))
})

router.get('/:invoice_id', (req, res, next) => {
  res.json(req.invoice)
})

router.post('/', (req, res, next) => {
  new Invoice(req.body.invoice).save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.put('/:invoice_id', (req, res, next) => {
  Object.assign(req.invoice, req.body.invoice)

  req.invoice.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.delete('/:invoice_id', (req, res, next) => {
  Invoice.findOneAndRemove(req.invoice._id)
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

module.exports = router

