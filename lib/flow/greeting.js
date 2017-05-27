'use strict'

const rp = require('minimal-request-promise')
const mainMenu = require('../main-menu')

function greeting(sender, facebookAccessToken) {
  return rp.get(`https://graph.facebook.com/v2.6/${sender}?fields=first_name,locale,timezone,gender&access_token=${facebookAccessToken}`)
    .then(response => {
      const user = JSON.parse(response.body)
      return [
        `Hello ${user.first_name}. Welcome to citizns.eu election bot!`,
        'What can I do for you today?',
        mainMenu()
      ]
    })
}

module.exports = greeting
