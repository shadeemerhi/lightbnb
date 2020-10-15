SELECT properties.id, properties.title, properties.cost_per_night, avg(rev.rating) as average_rating
FROM properties
JOIN property_reviews rev
ON rev.property_id = properties.id
WHERE 1 = 1
AND city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(rating) >= 4
ORDER BY cost_per_night;