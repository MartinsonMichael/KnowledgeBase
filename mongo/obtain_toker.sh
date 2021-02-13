#!/bin/bash

curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"username":"admin","password":"12345678"}'
