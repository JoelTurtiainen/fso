curl -s -i -X POST \
    'http://localhost:3001/api/blogs' \
    -H 'Content-Type: application/json' \
    -d '{"title": "Saunomista", "author": "Kari Kiuas", "url":"wikipedia.org", "likes": 5}' \
