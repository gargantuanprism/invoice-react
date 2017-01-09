var express = require('express')
const createError = require('http-errors')

const Client = require('../db').Client

var router = express.Router({mergeParams: true})

router.use((req, res, next) => {
  Client.findById(req.params.client_id)
    .then(doc => {
      if (!doc){
        next(createError(404))
      }

      req.client = doc
      next()
    })
    .catch(err => next(err))
})

router.get('/', (req, res, next) => res.json(req.client.projects))

router.post('/', (req, res, next) => {
  req.client.projects.push(req.body.project)
  req.client.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

module.exports = router

