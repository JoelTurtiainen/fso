curl -s -i -X PUT \
  'http://localhost:3001/api/users/jones@example.com' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmVzQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTc1NTU4NTU4NH0.Be3Ym2ix7YHgQ-1Sev0-5tnWJ4DQqFfG1wyj68ytHw8' \
  -H 'Content-Type: application/json' \
  -d '{"disabled": false}' \
