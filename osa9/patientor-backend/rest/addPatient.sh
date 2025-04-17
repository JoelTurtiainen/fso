curl -s -i -X POST \
    'http://localhost:3001/api/patients' \
    -H 'Content-Type: application/json' \
    -d '{ "name": "Jole", "ssn": "12345-ABC", "dateOfBirth": "2025-04-17", "gender":"male", "occupation": "student" }' \
