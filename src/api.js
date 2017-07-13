import axios from 'axios'

module.exports = {
  draw: {
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

  user: {
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
    }
  },

  bet: {
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