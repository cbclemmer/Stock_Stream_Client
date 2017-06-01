import api from 'api'
import ko from 'knockout'
import _ from 'lodash'
import moment from 'moment'

export default class {
  constructor() {
    this.sort = ko.observable('symbol')
    this.desc = ko.observable(false)
    this.ready = ko.observable(false)
    this.showHelp = ko.observable(false)
    this.searchText = ko.observable('')

    api.get('/api/portfolio')
    .then((res) => {
      this.cash = ko.observable(res.cashBalance)
      this.assets = ko.observableArray(this.getAssets(res.assets))
      this.timeStamp = ko.observable(moment(new Date(res.timeStamp)).format('MMMM Do YYYY, h:mm:ss a'))
      this.assets.shown = ko.pureComputed(() => _(this.assets())
        .orderBy(this.sort(), this.desc() ? 'desc' : 'asc')
        .filter((a) => new RegExp(this.searchText().toLowerCase()).test(a.symbol.toLowerCase()))
        .value())
      this.numShares = ko.pureComputed(() => {
        let count = 0
        _.each(this.assets(), (a) => count += a.shares)
        return count
      })
      this.ready(true)
    })
  }

  getAssets(assets) {
    return _(assets)
      .map((a) => _.defaults(a, {
          totalInvested: (a.avgCost * a.shares),
          totalInvestedString: parseFloat((a.avgCost * a.shares).toFixed(2)).toLocaleString(),
          avgCostString: parseFloat(a.avgCost.toFixed(2)).toLocaleString()
        }))
      .value()
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

  sortInvested() {
    this.sortChange('totalInvested')
  }

  sortChange(sort) {
    this.sort(sort)
    this.desc(!this.desc())
  }
}
