DECLARE @drawNumber BIGINT = 81707140312

SELECT * FROM Draws WHERE drawNumber = @drawNumber
SELECT * FROM Odds WHERE drawNumber= @drawNumber
SELECT * FROM Bets WHERE drawNumber = @drawNumber
SELECT * FROM Odds WHERE drawNumber= @drawNumber AND isWinner = 1