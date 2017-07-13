import axios from 'axios'

module.exports = {
  draws: {
    latestDraw: (gameId) => {

      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            latestDraw(gameId: ${gameId}) {
              draw {
                id
                drawNumber
                latestOdds {
                  id
                  odds
                  outcome {
                    id
                    name
                  }
                }
              }
              errors {
                key
                msg
              }
            }
          }
        `
      })

    },
  },

  users: {
    get: (userId) => {
      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            user(id: 1) {
              id
              currentBalance
              username
            }
          }
        `
      })
    },
    bets: (userId, gameId) => {
      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            user(id: 1) {
              currentBalance
              bets(gameId: 3) {
                id
                drawNumber
                amount
                draw {
                  id
                  game {
                    name
                  }
                }
                oddId
                odd {
                  id
                  isWinner
                  odds
                  gamePart {
                    id
                    name
                  }
                  outcomeId
                  outcome {
                    id
                    name
                  }
                }
              }
            }
          }
        `
      })
    }
  },

  bets: {
    create: (data) => {
      return axios.post('http://localhost:3000/graphql', {
        query: `
          mutation {
            createBet(data: {
              drawNumber: "${data.drawNumber}",
              userId: "${data.userId}",
              oddId: "${data.oddId}",
              amount: ${data.amount}
            }) 
            {
              bet {
                id
              }
              errors {
                key
                msg
              }
            }
          }
        `
      })
    }
  }

}