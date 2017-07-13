'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Translator', [
      {
        word: 'balance',
        korean: '보유머니'
      },
      {
        word: 'bet on poker',
        korean: '배당 포커'
      },
      {
        word: 'baccarat',
        korean: '배당 바카라'
      },
      {
        word: 'war of bets',
        korean: '1:1 벳'
      },
      {
        word: 'bet slip',
        korean: '베팅슬립'
      },
      {
        word: 'your bet slip is empty. please choose betting option from a list.',
        korean: '현재 배팅슬립 이 비어 있습니다. 베팅종류를 선택하세요'
      },
      {
        word: 'amount',
        korean: '베팅금액'
      },
      {
        word: 'place bet',
        korean: '베팅 하기'
      },
      {
        word: 'recent bets',
        korean: '최근 베팅내역'
      },
      {
        word: 'hands',
        korean: '플레이어 (오른쪽부터 1,2,3,4,5,6 순 입니다)'
      },
      {
        word: 'hand 1 wins',
        korean: '플레이어 1 승리'
      },
      {
        word: 'hand 2 wins',
        korean: '플레이어 2 승리'
      },
      {
        word: 'hand 3 wins',
        korean: '플레이어 3 승리'
      },
      {
        word: 'hand 4 wins',
        korean: '플레이어 4 승리'
      },
      {
        word: 'hand 5 wins',
        korean: '플레이어 5 승리'
      },
      {
        word: 'hand 6 wins',
        korean: '플레이어 6 승리'
      },
      {
        word: 'primary bets',
        korean: '우선 베팅'
      },
      {
        word: 'player card',
        korean: '플레이어 카드'
      },
      {
        word: 'banker card',
        korean: '뱅커 카드'
      },
      {
        word: 'main bets',
        korean: '메인 베팅'
      },
      {
        word: 'dealer wins',
        korean: '딜러 승리'
      },
      {
        word: 'player wins',
        korean: '플레이어 승리'
      },
      {
        word: 'war',
        korean: '워'
      },
      {
        word: 'won',
        korean: '승'
      },
      {
        word: 'lost',
        korean: '패'
      },
      {
        word: 'player',
        korean: '플레이어'
      },
      {
        word: 'banker',
        korean: '뱅커'
      },
      {
        word: 'tie',
        korean: '타이'
      },
      {
        word: 'please wait, while the cards will be dealt',
        korean: '카드가 처리되는 동안 잠시 기다려주십시오'
      },
      {
        word: 'place your bets',
        korean: '베팅'
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
