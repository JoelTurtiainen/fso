curl -s -i -X POST \
  'http://localhost:3001/api/users/' \
  -H 'Content-Type: application/json' \
  -d '{"username": "jones@example.com", "name": "Indiana Jones"}' \
