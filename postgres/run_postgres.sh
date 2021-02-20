#!/bin/bash

echo "Rebuild docker image..."
docker build -t kb_postgres -f dev_Dockerfile .

echo "Start docker container..."
docker run \
    --rm --name kb_postgres \
    -p 5435:5432 \
    -v kb_data:/var/lib/postgresql/data/ \
    -t kb_postgres 
