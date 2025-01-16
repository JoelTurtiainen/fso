# curl -s -i -X POST \
#   'http://localhost:3001/api/blogs' \
#   -H 'Content-Type: application/json' \
#   -d '{"title": "Saunomista", "userId": "6787880404af32e0b3ba99e9", "url":"wikipedia.org", "likes": 5}' \
#
curl -s -i -X POST \
  'http://localhost:3001/api/users' \
  -H 'Content-Type: application/json' \
  -d '{"username": "", "name": "Pasi Porsas", "password":"qwertyuiop"}' \
