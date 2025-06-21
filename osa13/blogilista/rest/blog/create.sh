curl -s -i -X POST \
  'http://localhost:3001/api/blogs' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthbGxlIiwiaWQiOjMsImlhdCI6MTc1MDQwODgxOH0.ntt80uybG0ilh2jX_OhOgK9RG5QDcsJgyg2y0btNNGM' \
  -H 'Content-Type: application/json' \
  -d '{"author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", "title": "First class test" }' \
