FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db docker-node-mongo --collection items --type json --file /init.json --jsonArray