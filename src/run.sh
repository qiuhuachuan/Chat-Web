npm run build
scp -r dist root@103.143.11.42:/root/code
# cd dist
# nohup python -m http.server 8080 > ./web.log &