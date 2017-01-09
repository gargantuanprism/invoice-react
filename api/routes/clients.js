const express = require('express')
const createError = require('http-errors')

const Client = require('../db').Client

const router = express.Router()
router.use('/:client_id/projects', require('./projects'))

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

  // Use save() instead of findOneAndUpdate() so that validation is
  // performed
  Client.findById(req.params.id)
    .then(doc => {
      if (!doc){
        return next(createError(404))
      }
      
      Object.assign(doc, req.body.client)
      return doc.save()
    })
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  Client.findOneAndRemove(req.params.id)
    .then(doc => doc ? res.json(doc): next(createError(404)))
    .catch(err => next(err))
})

module.exports = router

