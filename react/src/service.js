const util = require('util')

import AppError from './error'

class RemoteService {
  static BASE_URL = null

  static index(){
    return this._request(this.BASE_URL, 'GET')
  }

  static create(data){
    return this._request(this.BASE_URL, 'POST', data)
  }

  static read(id){
    return this._request(this._resource_url(id), 'GET')
  }

  static update(id, data){
    return this._request(this._resource_url(id), 'PUT', data)
  }

  static destroy(id){
    return this._request(this._resource_url(id), 'DELETE')
  }

  static _resource_url(id){
    return util.format('%s/%s', this.BASE_URL, id)
  }

  static _request(url, method, data){
    return fetch(url, {
      method: method,
      body: data ? JSON.stringify(data): null,
      headers: new Headers({'content-type': 'application/json'})
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors){
          throw new AppError(json.errors)
        }

        return json
      })
      .catch(err => {
        throw err
      })
  }
}

export class ClientService extends RemoteService {
  static BASE_URL = 'http://localhost:3001/clients'
}

