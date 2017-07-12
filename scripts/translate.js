const fs = require('fs')
const db = require('../models/db')

db.Translator.findAll().then(words => {
  console.log(JSON.stringify(words, null, 2))
  let wordsDict = {}
  for (let i = 0; i < words.length; i++) {
    wordsDict[words[i].word] = {
      en: words[i].word,
      ko: words[i].korean
    }
  }

  fs.writeFileSync('./config/translate.json', JSON.stringify(wordsDict, null, 2))

})