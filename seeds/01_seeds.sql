INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', evastanley@gmail.com, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meye', lmeye@gmail.com, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Perks', domperks@yahoo.com, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', sueluna2@gmail.com, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Etta West', ettawest@gmail.com, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO properties (owner_id, title, description, thumbnail_photo_art, 
-- cover_photo_art, cost_per_night, parking_spaces, number_of_bathrooms, country, street, city, province, post_code, active)
-- VALUES ()


INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES (2, 5, 10, 3, 'messages'),
(1, 4, 1, 4, 'messages'),
(5, 1, 2, 4, 'messages'),
(3, 8, 5, 4, 'messages'),
(4, 2, 7, 5, 'messages'),

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (2, 3, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(1, 4, '2021-10-01', '2021-10-14'),
(3, 5, '2014-10-21', '2014-10-23'),
(3, 4, '2016-07-17', '2016-07-23');