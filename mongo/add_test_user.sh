#!/bin/bash

curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/user/create/ --data '{"email":"admin@admin.admin","username":"admin","password":"12345678"}'
