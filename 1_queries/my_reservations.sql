SELECT prop.id, prop.title, prop.cost_per_night, res.start_date, avg(rev.rating) as average_rating
FROM reservations res
JOIN properties prop
  ON prop.id = res.property_id
JOIN property_reviews rev
  ON prop.id = rev.property_id
WHERE res.end_date < now()::date
AND res.guest_id = 1
GROUP BY res.id, prop.id
ORDER BY res.start_date
LIMIT 10;