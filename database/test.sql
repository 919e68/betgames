DECLARE @DrawNumber BIGINT = 81707100857
select * from Draws WHERE drawNumber = @DrawNumber
select * from Odds where drawNumber = @DrawNumber


delete from Draws
delete from Odds