#!/bin/bash

docker run -it \
    --rm --name mongo_kb \
    -v mongodata:/data/db \
    -p 27017:27017 \
    mongo
