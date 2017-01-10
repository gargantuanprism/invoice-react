var express = require('express')
const createError = require('http-errors')

const Client = require('../db').Client

var router = express.Router({mergeParams: true})

router.param('project_id', (req, res, next, project_id) => {
  var project = req.client.projects.id(project_id)

  if (project){
    req.project = project
    next()
  }
  else {
    next(createError(404))
  }
})

router.get('/', (req, res, next) => res.json(req.client.projects))

router.post('/', (req, res, next) => {
  req.client.projects.push(req.body.project)
  req.client.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.get('/:project_id', (req, res, next) => res.json(req.project))

router.put('/:project_id', (req, res, next) => {
  Object.assign(req.project, req.body.project)
  req.client.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

router.delete('/:project_id', (req, res, next) => {
  req.project.remove()
  req.client.save()
    .then(doc => res.json(doc))
    .catch(err => next(err))
})

module.exports = router

