curl -s -i -X POST \
    'http://localhost:3003/exercises' \
    -H 'Content-Type: application/json' \
    -d '{ "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5], "target": 2.5 }' \
