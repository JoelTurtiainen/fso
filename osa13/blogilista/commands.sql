-- Initial table

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

-- ^^^ Then run once to generate rest of the tables with migrations

-- Sample data:
insert into users (username, name) values ('jones@example.com', 'Indiana Jones');
insert into users (username, name) values ('leevi@example.com', 'Leevi');
insert into blogs (author, url, title, user_id, year) values ('Michael Chan', 'https://reactpatterns.com/', 'React Patterns', 1, 2017);
insert into blogs (author, url, title, user_id, year) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'Type Wars', 1, 2016);
insert into reading_lists (user_id, blog_id) values (1, 2);
insert into reading_lists (user_id, blog_id) values (2, 1);
