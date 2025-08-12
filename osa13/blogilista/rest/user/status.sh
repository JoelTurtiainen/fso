curl -s -i -X PUT \
  'http://localhost:3001/api/users/leevi@example.com' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmVzQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTc1NDk3NTc0OH0.SiPxQRP5VVVJ2Kw41WPD992UddSqsN6oUW-ENWQrm50' \
  -H 'Content-Type: application/json' \
  -d '{"disabled": false}' \
