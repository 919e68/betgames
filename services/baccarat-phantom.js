var system = require('system')
var webPage = require('webpage')
var page = webPage.create()

var args = system.args
var address = 'https://betgames9.betgames.tv/ext/game/odds/testpartner/6/0/decimal'

page.onConsoleMessage = function(msg) {
  console.log(msg)
}


if (address) {
  page.open(address, function(status) {
    page.evaluate(function() {

      var Cards = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'j': 11,
        'q': 12,
        'k': 13,
        'a': 1
      }

      var gameSaved = false
      var lastDraw = null
      var isWaiting = false
      var hasWinner = false
      var drawSaved = false
      var lastCountdown = null


      function send(data) {
        setTimeout(function() {
          console.log(JSON.stringify(data))
        }, 0)
      }

      function getCardSymbol(str) {
        var symbol = null

        if (str.indexOf('diamonds') !== -1) {
          symbol = 'diamonds'

        } else if (str.indexOf('hearts') !== -1) {
          symbol = 'hearts'

        } else if (str.indexOf('spades') !== -1) {
          symbol = 'spades'

        } else if (str.indexOf('clubs') !== -1) {
          symbol = 'clubs'
        }

        return symbol
      }

      function getWinnerCards(el) {
        var cardParamsEl = el.querySelectorAll('span.card')
        var result = []

        if (cardParamsEl.length > 0) {
          for (var i = 0; i < cardParamsEl.length; i++) {
            result.push({
              number: Cards[cardParamsEl[i].innerHTML.split('<span')[0].trim()],
              symbol: getCardSymbol(cardParamsEl[i].innerHTML.split('<span')[1])
            })
          }
        }

        return result
      }

      setInterval(function() {
        var drawIdEl = document.getElementById('alert_top_code')
        var progressEl = document.querySelectorAll('#lottery_6 .game-progress-bar div.progress-bar')
        var oddsEl = document.querySelectorAll('#lottery_6 #group_35 > div.panel-body > div.list-group > a > span.badge')
        var msgTxtEl = document.querySelectorAll('#lottery_6 div#message-text')

        // get draw number
        var drawNumber = parseInt(drawIdEl.innerHTML.trim())

        // get message
        var msgTxt = msgTxtEl[0].innerHTML.trim()
        
        // get current bet type id

        var gamePartId = null
        var currentMsg = null

        // for new draw
        if (msgTxt.indexOf('Place your bets') !== -1) {
          isWaiting = false
          hasWinner = false

          if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '0px' && progressEl[2].style.width == '0px') {
            gamePartId = 6

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '0px') {
            gamePartId = 7

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '100%') {
            gamePartId = 8

          }

          if (drawNumber && gamePartId) {
            var currentDraw = drawNumber + '-' + gamePartId

            if (!gameSaved) {
              gameSaved = true
              var drawData = {
                type: 'create',
                table: 'draw',
                data: {
                  drawNumber: drawNumber,
                  gamePartId: gamePartId
                }
              }

              send(drawData)
            }

            if (currentDraw != lastDraw) {
              lastDraw = currentDraw

              var odds = {
                player: {},
                banker:  {},
                tie:  {},
              }

              // get odds
              var oddProp = ['player', 'banker', 'tie']
              for (var i = 0; i < 3; i++) {
                if (!isNaN(oddsEl[i].innerHTML.trim())) {
                  odds[oddProp[i]].odds = parseFloat(oddsEl[i].innerHTML.trim())

                } else if (oddsEl[i].innerHTML.trim().indexOf('<img') !== -1) {
                  odds[oddProp[i]].odds = 'loading'

                } else {
                  odds[oddProp[i]].odds = oddsEl[i].innerHTML.trim()
                }
              }


              var data = {
                type: 'create',
                table: 'odd',
                data: {
                  drawNumber: drawNumber,
                  gamePartId: gamePartId,
                  odds: odds
                }
              }

              send(data)
            }

            // countdown
            var countDownEl = document.querySelectorAll('#lottery_6 #countdown_bet > span.countdown_row')
            if (countDownEl.length > 0) {
              var countdown = countDownEl[0].innerHTML.trim()

              if (countdown != lastCountdown) {
                lastCountdown = countdown

                var data = {
                  type: 'countdown',
                  timer: countdown
                }

                send(data)
              }
            }
          }

        // for waiting
        } else if (msgTxt.indexOf('Please wait') !== -1) {
          lastCountdown = null

          var data = {
            type: 'waiting',
            msg: 'Please wait, while the cards will be dealt'
          }

          if (!isWaiting) {
            isWaiting = true
            send(data)            
          }
          

        // for winner
        } else if (msgTxt.indexOf('<div id="results-winner-cards">') !== -1) {
          isWaiting = false
          var winner = null
          var winningNumber = []
          var winningSymbol = []
          var params = {}

          var winnerEl = document.querySelectorAll('#lottery_6 div#message-text > #results-winner-cards > span.web-winner-cards')

          if (!hasWinner && winnerEl.length > 0) {
            hasWinner = true
            gameSaved = false

            // get odds
            var oddProp = ['player', 'banker', 'tie']
            for (var i = 0; i < 3; i++) {
              if (oddsEl[i].innerHTML.trim() == 'won') {
                winner = oddProp[i]
                break
              }
            }

            var winningCards = getWinnerCards(winnerEl[0])
            var winningTotal = winnerEl[0].innerHTML.trim().substr(-3).substr(1, 1)

            for (var i = 0; i < winningCards.length; i++) {
              winningNumber.push(winningCards[i].number)
              winningSymbol.push(winningCards[i].symbol)
            }

            winningNumber.push(winningTotal)

            var data = {
              type: 'winner',
              data: {
                drawNumber: drawNumber,
                winner: winner,
                winningNumber: winningNumber.join('-'),
                winningSymbol: winningSymbol.join('-')
              }
            }

            send(data)
          }
        }
      }, 100)

    })
  })


} else {
  console.log('undefined address')
}
