#!/bin/bash

docker run -it \
    --rm --name studygram_db \
    -v mongodata:/data/db \
    -p 27017:27017 \
    mongo
