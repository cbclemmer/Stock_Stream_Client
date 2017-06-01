import api from 'api'
import ko from 'knockout'

export default class {
  constructor() {
    this.ready =ko.observable(false)
    
    // Test API
    api.get('/api/portfolio')
    .then((res) => {
      this.cash = ko.observable(res.cashBalance)
      this.assets = ko.observableArray(res.assets)
      this.ready(true)
    })
  }
}
