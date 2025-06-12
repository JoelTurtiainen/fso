curl -s -i -X POST \
  'http://localhost:3001/api/blogs' \
  -H 'Content-Type: application/json' \
  -d '{"author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", "title": "First class test" }' \
