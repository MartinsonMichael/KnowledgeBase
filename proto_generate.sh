#!/bin/bash

cd http-gen && python main.py \
    --proto-path "../proto/" \
    --py-path "../back/api/" \
    --ts-path "../front/src/store/"
