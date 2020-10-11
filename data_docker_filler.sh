#!/bin/bash

if [[ $# -ne 1 ]]; then
    echo "Must be one argument: 'test' or file name"
    exit 1
fi

if [ $1 == "test" ]; then
    echo "test mode"
    echo "execute : select name from api_notedb"
    docker exec -it kb_database psql -U kb_user -d kb_database -c "select name from api_notedb"
    exit 0
fi

echo "mnormal mode"
echo "execute sql from file $1"
docker exec -it kb_database psql -U kb_user -d kb_database -f $1
