import api from 'api'
import ko from 'knockout'
import _ from 'lodash'

export default class {
  constructor() {
    this.sort = ko.observable('symbol')
    this.desc = ko.observable(false)
    this.ready = ko.observable(false)
    this.searchText = ko.observable('')

    api.get('/api/portfolio')
    .then((res) => {
      this.cash = ko.observable(res.cashBalance)
      this.assets = ko.observableArray(res.assets)
      this.assets.shown = ko.pureComputed(() => _(this.assets())
        .orderBy(this.sort(), this.desc() ? 'desc' : 'asc')
        .filter((a) => new RegExp(this.searchText().toLowerCase()).test(a.symbol.toLowerCase()))
        .value())
      this.ready(true)
    })
  }

  sortSymbol() {
    this.sortChange('symbol')
  }

  sortShares() {
    this.sortChange('shares')
  }

  sortCost() {
    this.sortChange('avgCost')
  }

  sortChange(sort) {
    this.sort(sort)
    this.desc(!this.desc())
  }
}
