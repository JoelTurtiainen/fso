curl -s -i -X PUT \
  'http://localhost:3001/api/readinglists/10' \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmVzQGV4YW1wbGUuY29tIiwiaWQiOjEsImlhdCI6MTc1NTIzNzAwN30.dTd_6AhuST5B1DC19YOu6DDiLyStyF61c98VJfvekS0' \
  -H 'Content-Type: application/json' \
  -d '{"read": true}' \

