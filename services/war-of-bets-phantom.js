var system = require('system')
var webPage = require('webpage')
var page = webPage.create()

var args = system.args
var address = 'https://betgames9.betgames.tv/ext/game/odds/testpartner/8/0/decimal'

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

      setInterval(function() {
        var drawIdEl = document.getElementById('alert_top_code')
        var progressEl = document.querySelectorAll('#lottery_8 .game-progress-bar div.progress-bar')
        var oddsEl = document.querySelectorAll('#lottery_8 #group_45 > div.panel-body > div.list-group > a > span.badge')
        var msgTxtEl = document.querySelectorAll('#lottery_8 div#message-text')

        var odds = {
          dealer: null,
          player: null,
          war: null
        }

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

          if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '0px') {
            gamePartId = 9
          } else if (progressEl[0].style.width == '100%' && progressEl[1].style.width == '100%') {
            gamePartId = 10
          }

          if (drawNumber && gamePartId) {
            var currentDraw = drawNumber + '-' + gamePartId

            if (!gameSaved) {
              gameSaved = true
              var drawData = {
                type: 'create',
                table: 'draw',
                data: {
                  drawNumber: drawNumber
                }
              }

              send(drawData)
            }

            if (currentDraw != lastDraw) {
              lastDraw = currentDraw

              var odds = {
                dealer: null,
                player: null,
                war: null
              }

              // get odds
              var oddProp = ['dealer', 'player', 'war']
              for (var i = 0; i < 3; i++) {
                if (!isNaN(oddsEl[i].innerHTML.trim())) {
                  odds[oddProp[i]] = parseFloat(oddsEl[i].innerHTML.trim())
                }
                 else if (oddsEl[i].innerHTML.trim().indexOf('<img') !== -1) {
                  odds[oddProp[i]] = 'loading'
                } else {
                  odds[oddProp[i]] = oddsEl[i].innerHTML.trim()
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
            var countDownEl = document.querySelectorAll('#lottery_8 #countdown_bet > span.countdown_row')
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
          
          var data = {
            type: 'waiting',
            msg: 'Please wait, while the cards will be dealt'
          }

          if (!isWaiting) {

            send(data)

            isWaiting = true
            drawSaved = false
            lastCountdown = null
          }
          

        // for winner
        } else if (msgTxt.indexOf('<div id="results-winner-cards">') !== -1) {
          isWaiting = false

          var winner = null
          var winningNumber = null
          var winningSymbol = null

          var winnerEl = document.querySelectorAll('#lottery_8 div#message-text > #results-winner-cards > span.results-player-cards > span#results-war-winner')
          var winningNumberEl = document.querySelectorAll('#lottery_8 div#message-text > #results-winner-cards > span.results-player-cards > span.results-player-cards > span.card')

          if (!hasWinner && winnerEl.length > 0 && winningNumberEl.length > 0) {
            
            winner = winnerEl[0].innerHTML.trim().toLowerCase()
            winningNumber = winningNumberEl[0].innerHTML.split('<span')[0].trim().toLowerCase()

            if (winningNumberEl[0].className.indexOf('diamonds') !== -1) {
              winningSymbol = 'diamonds'

            } else if (winningNumberEl[0].className.indexOf('hearts') !== -1) {
              winningSymbol = 'hearts'

            } else if (winningNumberEl[0].className.indexOf('spades') !== -1) {
              winningSymbol = 'spades'

            } else if (winningNumberEl[0].className.indexOf('clubs') !== -1) {
              winningSymbol = 'clubs'

            }

            var data = {
              type: 'winner',
              data: {
                drawNumber: drawNumber,
                winner: winner,
                winningNumber: Cards[winningNumber],
                winningSymbol: winningSymbol
              }
            }

            send(data)

            hasWinner = true
            gameSaved = false
          }
        }
      }, 100)

    })
  })


} else {
  console.log('undefined address')
}
