curl -s -i -X POST \
  'http://localhost:3001/api/notes' \
  -H 'Content-Type: application/json' \
  -d '{"content": "test", "important": 17}' \
