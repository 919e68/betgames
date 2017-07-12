var system = require('system')
var webPage = require('webpage')
var page = webPage.create()

var args = system.args
var game = args[1]

var address = null

if (game == 'war-of-bets') {
  address = 'https://betgames9.betgames.tv/ext/game/odds/testpartner/8/0/decimal'
}


page.onConsoleMessage = function(msg) {
  console.log(msg)
}


if (address) {
  page.open(address, function(status) {

    page.evaluate(function() {

      $(document).ajaxComplete(function(event, xhr, options) {
        console.log(JSON.stringify(xhr.responseText))
        if (xhr.responseText.indexOf('stream_option_names') !== -1) {
          var json = JSON.parse(xhr.responseText)
          console.log(JSON.stringify(json, null, 2))
        }
      })

      var lastStream = null
      setInterval(function() {
        currentStream = betgames_iframe.stream.stream_name
        if (currentStream != lastStream) {
          lastStream = currentStream
          console.log(currentStream)
        }
      }, 1000)
    })
  })


} else {
  console.log('undefined address')
}
