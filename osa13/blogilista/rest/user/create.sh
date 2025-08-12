curl -s -i -X POST \
  'http://localhost:3001/api/users/' \
  -H 'Content-Type: application/json' \
  -d '{"username": "leevi@example.com", "name": "Leevi"}' \
