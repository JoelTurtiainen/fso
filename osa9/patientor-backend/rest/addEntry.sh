# curl -s -i -X POST \
#     'http://localhost:3001/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries' \
#     -H 'Content-Type: application/json' \
#     -d '{ "date": "2000-01-01", "type": "Hospital", "specialist":"Doge", "diagnosisCodes": ["S60.6"], "description": "bruh", "discharge": {"date": "2001-01-02", "criteria": "Bruh has healed"} }' \

curl -s -i -X POST \
    'http://localhost:3001/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries' \
    -H 'Content-Type: application/json' \
    -d '{ "date": "2000-01-01", "specialist":"Doge", "diagnosisCodes": ["S60.6"], "description": "bruh", "employerName": "Doge", "sickLeave": {"startDate": "2001-01-02", "endDate": "2002-01-05"} }' \


# curl -s -i -X POST \
#     'http://localhost:3001/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries' \
#     -H 'Content-Type: application/json' \
#     -d '{ "date": "2000-01-01", "specialist": "MD House", "type": "HealthCheck", "description": "Yearly control visit.", "healthCheckRating": 0 }' \
