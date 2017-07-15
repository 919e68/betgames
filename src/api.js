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
                  gamePartId
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
    get: (gameId, drawNumber, date) => {
      let filter = []

      if(gameId) {
        filter.push(`gameId: ${gameId}`)
      }

      if(drawNumber) {
        filter.push(`drawNumber: "${drawNumber}"`)
      }

      if(date) {
        filter.push(`date: "${date}"`)
      }

      filter = filter.length ? `(${filter.join(', ')})` : ''

      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            draws ${filter} {
              id
              updatedAt
              drawNumber
              createdAt
              winningCards {
                number
                rank
                symbol
              }
              winnerFormatted
              game {
                name
              }
            }
          }
        `
      })
    }
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
              recentBets(gameId: ${gameId}) {
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
    },
    betHistory: (userId, gameId, date) => {

      let filter = []
      if(gameId) {
        filter.push('gameId: ' + gameId)
      }

      if(date) {
        filter.push(`date: ${date}`)
      }
      
      filter = filter.length ? `(${filter.join(', ')})` : ''

      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            user (id: ${userId}) {
              bets ${filter} {
                amount
                odd {
                  isWinner
                  odds
                  outcome {
                    name
                  }
                }
                updatedAt
                draw {
                  drawNumber
                  game {
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
  },

  balance: {
    get: (userId, drawNumber, outcomeId) => {
      return axios.post('http://localhost:3000/graphql', {
        query: `
          query {
            bettingBalance(drawNumber: "${drawNumber}", outcomeId: "${outcomeId}", userId: "${userId}") {
              min
              max
            }
          }
        `
      })
    }
  }

}


















