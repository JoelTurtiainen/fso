CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Michael Chan', 'https://reactpatterns.com/', 'React Patterns');

insert into blogs (author, url, title) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'Type Wars');

