curl -s -i -X PUT \
  'http://localhost:3001/api/blogs/9' \
  -H 'Content-Type: application/json' \
  -d '{"likes": 9}' \
