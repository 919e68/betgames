import axios from 'axios'

exports.GetLatestDraw = (gameId) => {
  console.log('GETTING LASTEST DRAW')
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
}