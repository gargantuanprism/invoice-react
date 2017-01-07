var express = require('express')
const createError = require('http-errors')
var router = express.Router()

const Client = require('../db').Client

router.get('/', (req, res, next) => {
  Client.find({})
    .then(docs => res.json(docs))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => (
  Client.findById(req.params.id)
    .then(doc => doc ? res.json(doc): next(createError(404)))
    .catch(err => next(err))
))

router.post('/', (req, res, next) => {
  new Client(req.body.client).save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  Client.findOneAndUpdate({_id: req.params.id}, req.body.client)
    .then(doc => doc ? res.json(doc): next(createError(404)))
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  Client.findOneAndRemove(req.params.id)
    .then(doc => doc ? res.json(doc): next(createError(404)))
    .catch(err => next(err))
})

module.exports = router

