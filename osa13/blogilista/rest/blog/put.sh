curl -s -i -X PUT \
  'http://localhost:3001/api/blogs/1' \
  -H 'Content-Type: application/json' \
  -d '{"year": 1990}' \
