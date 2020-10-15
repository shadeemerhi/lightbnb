const properties = require('./json/properties.json');
const users = require('./json/users.json');

// Connecting to the database
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryString = `
  SELECT * FROM users
  WHERE email = $1`;
  const values = [email];

  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(() => null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const queryString = `
  SELECT * FROM users
  WHERE id = $1`;
  const values = [id];

  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(() => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const queryString = `
  INSERT INTO users
  (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`
  const values = [user.name, user.email, user.password];
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(() => null);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const queryString = `SELECT prop.*, res.*, avg(rev.rating) as average_rating
  FROM reservations res
  JOIN properties prop
    ON prop.id = res.property_id
  JOIN property_reviews rev
    ON prop.id = rev.property_id
  WHERE res.end_date < now()::date
  AND res.guest_id = $1
  GROUP BY res.id, prop.id
  ORDER BY res.start_date
  LIMIT $2;`;
  
  const values = [guest_id, limit];
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch(() => null);

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    WHERE 1 = 1
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += ` AND city LIKE $${queryParams.length} `;
    }

    options.owner_id = 1;
    // if an owner_id is passed in, only return properties belonging to that owner
    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += ` AND properties.owner_id = $${queryParams.length}; `;
      console.log(queryString, queryParams);
      return pool.query(queryString, queryParams)
      .then(res => res.rows)
      .catch(() => null);
    }

    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night*100}`);
      queryString += ` AND cost_per_night >= $${queryParams.length} `;
    }

    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night*100}`);
      queryString += ` AND cost_per_night <= $${queryParams.length} `;
    }

    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += ` HAVING avg(rating) >= $${queryParams.length} `;
    }

    queryString += ' GROUP BY properties.id ';
    queryString += ` LIMIT ${limit} `;

    console.log(queryString, queryParams);
  
    return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(() => null);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const queryString = `
  INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
    street, city, province, post_code, country, parking_spaces, number_of_bathrooms,
    number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url,
                  property.cover_photo_url, property.cost_per_night, property.street,
                  property.city, property.province, property.post_code, property.country,
                  property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  pool.query(queryString, values)
  .then(res => console.log(res.rows))
  .catch(() => null);
}
exports.addProperty = addProperty;
