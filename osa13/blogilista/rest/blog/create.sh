curl -s -i -X POST \
  'http://localhost:3001/api/blogs' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmVzQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTc1NDk3NTc0OH0.SiPxQRP5VVVJ2Kw41WPD992UddSqsN6oUW-ENWQrm50' \
  -H 'Content-Type: application/json' \
  -d '{"author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", "title": "First class test", "year": 2024 }' \

