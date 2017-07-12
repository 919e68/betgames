const Translate = require('../config/translate')

module.exports = function(word, language) {
  if (language === undefined) {
    language = 'en'
  }

  let htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang')

  if (htmlLang) {
    language = htmlLang
  }

  let wordInital = word
  word = word.toLowerCase()

  if (word in Translate) {
    let translated = Translate[word][language] ? Translate[word][language] : wordInital
    return translated
  }
}