curl -s -i -X POST \
  'http://localhost:3001/api/blogs' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmVzQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTc1NDkwODE0OH0.4oJgahWq7l7S4fQDJD17C9ZyMHWpQymgaKx1EKFOgJI' \
  -H 'Content-Type: application/json' \
  -d '{"author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", "title": "First class test" }' \
