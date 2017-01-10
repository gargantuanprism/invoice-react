const util = require('util')

import AppError from './error'

const base = 'http://192.168.1.174:3001'

class RemoteService {
  static index(){
    return this._request(this._generate_url.apply(this, arguments), 'GET')
  }

  static create(){
    var $data = [].pop.apply(arguments)
    return this._request(this._generate_url.apply(this, arguments), 'POST', 
      $data)
  }

  static read(){
    return this._request(this._generate_url.apply(this, arguments), 'GET')
  }

  static update(){
    var $data = [].pop.apply(arguments)
    return this._request(this._generate_url.apply(this, arguments), 'PUT', 
      $data)
  }

  static destroy(){
    return this._request(this._generate_url.apply(this, arguments), 'DELETE')
  }

  static _resource_url(id=null){
    return id ? util.format('%s/%s', this.URL, id): this.URL
  }

  static _generate_url(){
    var ids = Array.prototype.slice.call(arguments)
    var prot = this
    var chain = []

    // Get all prototypes up to top-level parent
    while (prot !== RemoteService){
      chain.unshift(prot)
      prot = Object.getPrototypeOf(prot)
    }

    // Generate URL fragments from each prototype's `_resource_url()` method
    var fragments = chain.map((prot, i) => prot._resource_url(ids[i]))

    return fragments.join('')
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
  static URL = util.format('%s/clients', base)
}

export class InvoiceService extends RemoteService {
  static URL = util.format('%s/invoices', base)
}

export class ProjectService extends ClientService {
  static URL = '/projects'
}

export class InvoiceItemService extends InvoiceService {
  static URL = '/invoice_items'
}

