var express = require('express')
const createError = require('http-errors')

const Invoice = require('../db').Invoice

var router = express.Router({mergeParams: true})

router.param('invoice_item_id', (req, res, next, invoice_item_id) => {
  var invoice_item = req.invoice.invoice_items.id(invoice_item_id)

  if (invoice_item){
    req.invoice_item = invoice_item
    next()
  }
  else {
    next(createError(404))
  }
})

router.get('/', (req, res, next) => res.json(req.invoice.invoice_items))

router.post('/', (req, res, next) => {
  req.invoice.invoiceItems.push(req.body.item)
  req.invoice.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.get('/:invoice_item_id', (req, res, next) => res.json(req.invoice_item))

router.put('/:invoice_item_id', (req, res, next) => {
  Object.assign(req.invoice_item, req.body.item)
  req.invoice.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.delete('/:invoice_item_id', (req, res, next) => {
  req.invoice_item.remove()
  req.invoice.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

module.exports = router

