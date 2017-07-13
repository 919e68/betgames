var system = require('system')
var webPage = require('webpage')
var page = webPage.create()

var args = system.args
var address = 'https://betgames9.betgames.tv/ext/game/odds/testpartner/5/0/decimal'

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

      function getHandParams(el) {
        var cardParamsEl = el.querySelectorAll('div.card')

        if (cardParamsEl.length == 2) {
          var firstCard = {
            number: Cards[cardParamsEl[0].innerHTML.split('<span')[0].trim()],
            symbol: getCardSymbol(cardParamsEl[0].innerHTML.split('<span')[1])
          }

          var secondCard = {
            number: Cards[cardParamsEl[1].innerHTML.split('<span')[0].trim()],
            symbol: getCardSymbol(cardParamsEl[1].innerHTML.split('<span')[1])
          }

          return {
            params1: firstCard,
            params2: secondCard
          }
        } else {
          return {
            params1: null,
            params2: null
          }
        }
      }

      setInterval(function() {
        var drawIdEl = document.getElementById('alert_top_code')
        var progressEl = document.querySelectorAll('#lottery_5 .game-progress-bar div.progress-bar')
        var oddsEl = document.querySelectorAll('#lottery_5 #group_32 > div.panel-body > div.list-group > a > span.badge')
        var oddsParamsEl = document.querySelectorAll('#lottery_5 #group_32 > div.panel-body > div.list-group > a > span.odd-name')
        var msgTxtEl = document.querySelectorAll('#lottery_5 div#message-text')

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

          if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '0px' && progressEl[2].style.width == '0px' && progressEl[3].style.width == '0px' && progressEl[4].style.width == '0px') {
            gamePartId = 1

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '0px' && progressEl[3].style.width == '0px' && progressEl[4].style.width == '0px') {
            gamePartId = 2

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '100%' && progressEl[3].style.width == '0px' && progressEl[4].style.width == '0px') {
            gamePartId = 3

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '100%' && progressEl[3].style.width == '100%' && progressEl[4].style.width == '0px') {
            gamePartId = 4

          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%' && progressEl[2].style.width == '100%' && progressEl[3].style.width == '100%' && progressEl[4].style.width == '100%') {
            gamePartId = 5
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
                hand_1: {},
                hand_2:  {},
                hand_3:  {},
                hand_4:  {},
                hand_5:  {},
                hand_6:  {}
              }

              // get odds
              var oddProp = ['hand_1', 'hand_2', 'hand_3', 'hand_4', 'hand_5', 'hand_6']
              for (var i = 0; i < 6; i++) {
                var params = getHandParams(oddsParamsEl[i])
                odds[oddProp[i]].params1 = params.params1
                odds[oddProp[i]].params2 = params.params2

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
            var countDownEl = document.querySelectorAll('#lottery_5 #countdown_bet > span.countdown_row')
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
          var params = {}


          var winnerEl = document.querySelectorAll('#lottery_5 div#message-text > #results-winner-cards > span.results-player-cards')

          if (!hasWinner && winnerEl.length > 0) {
            hasWinner = true
            gameSaved = false

            // get odds
            var oddProp = ['hand_1', 'hand_2', 'hand_3', 'hand_4', 'hand_5', 'hand_6']
            for (var i = 0; i < 6; i++) {
              if (oddsEl[i].innerHTML.trim() == 'won') {
                params = getHandParams(oddsParamsEl[i])
                winner = oddProp[i]
                break
              }
            }


            var data = {
              type: 'winner',
              data: {
                drawNumber: drawNumber,
                winner: winner,
                winningNumber: params.params1.number + '-' + params.params2.number,
                winningSymbol: params.params1.symbol + '-' + params.params2.symbol
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
