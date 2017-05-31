'use strict'

const ko = require('knockout')
const $  = require('jquery')
const _  = require('lodash')

const _modals = {}

/**
 * Show modal
 * @function bindings.modal
 *
 * @param {boolean} modal show modal
 */
ko.bindingHandlers.modal = {

  init(el, valueAccessor) {
    const showModal = _.isFunction(valueAccessor()) ? valueAccessor() : _modals[valueAccessor()]

    const $el = $(el)

    $el.on('hidden.bs.modal', () => {
      showModal(false)
    })

    ko.utils.domNodeDisposal.addDisposeCallback(el, () => {
      // ensure the modal-backdrop is removed when this modal is destroyed
      // especially when resulting from switching to a new route!
      $('.modal-backdrop').remove()
    })
  },

  update(el, valueAccessor) {
    const showModal = _.isFunction(valueAccessor()) ? valueAccessor() : _modals[valueAccessor()]
    $(el).modal(ko.unwrap(showModal) ? 'show' : 'hide')
  }
}

ko.bindingHandlers.modalTarget = {

  init(el, valueAccessor) {
    _modals[valueAccessor()] = ko.observable(false)

    ko.applyBindingsToNode(el, {
      click() {
        _modals[valueAccessor()](!_modals[valueAccessor()]())
      }
    })
  }

}

ko.bindingHandlers.modalDismiss = {

  init(el, valueAccessor) {
    ko.applyBindingsToNode(el, {
      click() {
        _modals[valueAccessor()](false)
      }
    })
  }

}
