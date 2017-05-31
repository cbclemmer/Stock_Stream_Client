import ko from 'knockout'

/**
 * toggle
 *
 * Toggles a boolean
 *
 * @function bindings.toggle
 * @param {boolean} toggle
 */
ko.bindingHandlers.toggle = {

  init(el, valueAccessor, allBindings) {
    if (!ko.isWritableObservable(valueAccessor())) {
      return
    }

    ko.applyBindingsToNode(el, {
      click() {
        if (allBindings.has('toggleDisable') && ko.unwrap(allBindings.get('toggleDisable'))) {
          return
        }

        valueAccessor()(!valueAccessor()())
      },
      css: {
        active: valueAccessor(),
        disable: allBindings.get('toggleDisable')
      }
    })
  }
}
