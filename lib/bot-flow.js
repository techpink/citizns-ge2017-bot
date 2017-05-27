'use strict'

const mainMenu = require('./main-menu')
const greeting = require('./flow/greeting')
const aboutBot = require('./flow/about-bot')
const credits = require('./flow/credits')

function botFlow(request, originalApiRequest) {
  console.log(JSON.stringify(request))
  originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false

  if (!request.postback)
    return apiAi(request.text, request.sender, originalApiRequest.env.apiAiToken)
      .then(res => {
        console.log('api.ai', res)
        if (res.action === 'smalltalk.greetings' || res.action === 'input.unknown' || res.params.simplified === 'can you help')
          return greeting(request.sender, originalApiRequest.env.facebookAccessToken)

        return res.reply.speech || res.reply
      })

  if (request.text === 'HELLO')
    return greeting(request.sender, originalApiRequest.env.facebookAccessToken)

  if (request.text === 'MAIN_MENU')
    return mainMenu()

  if (request.text === 'ABOUT')
    return aboutBot()

  if (request.text === 'CREDITS')
    return credits()
}

module.exports = botFlow
