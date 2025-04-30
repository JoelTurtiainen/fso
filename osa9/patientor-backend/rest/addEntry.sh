curl -s -i -X POST \
    'http://localhost:3001/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries' \
    -H 'Content-Type: application/json' \
    -d '{ "date": "2000-01-01", "type": "Hospital", "specialist":"Doge", "diagnosisCodes": ["S60.6"], "description": "bruh", "discharge": {"date": "2001-01-02", "criteria": "Bruh has healed"} }' \
