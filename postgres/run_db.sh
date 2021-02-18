#!/bin/bash

echo "Rebuild docker image..."
docker build -t study_dev_db -f dev_Dockerfile .

echo "Start docker container..."
docker run -p 5435:5432 -v study-postgres-data:/var/lib/postgresql/data/ -t study_dev_db
