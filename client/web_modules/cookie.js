'use strict'

/*
  COOKIE utils
  get:
    PARAMS:
      name
    RETURNS:
      value of cookie of name
  save:
    PARAMS:
      name: name to save value as
      value: value of cookie
      days: (opt) how many days to keep the cookie
*/

module.exports = {
  get: (name) => {
    const re = new RegExp(name + '=([^;]+)')
    const value = re.exec(document.cookie)
    return (value != null) ? unescape(value[1]) : null
  },
  save: (name, value, days) => {
    let expires
    if (days) {
      const date = new Date()
      date.setTime(date.getTime()+(days*24*60*60*1000))
      expires = '; expires='+date.toGMTString()
    }
    else expires = ''
    document.cookie = name+'='+value+expires+'; path=/'
  }
}
