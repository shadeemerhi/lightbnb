SELECT prop.city, count(res) as total_reservations
FROM reservations res
JOIN properties prop
ON res.property_id = prop.id
GROUP BY prop.city
ORDER BY total_reservations DESC;