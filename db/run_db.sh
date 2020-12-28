#!/bin/bash

echo "Rebuild docker image..."
docker build -t kb_db .

echo "Start docker container..."
docker run -p 5433:5432 -v postgres-data:/var/lib/postgresql/data/ -t kb_db
