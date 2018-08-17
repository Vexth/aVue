#!/bin/bash

cwd=$(cd $(dirname $0);pwd)
echo "current work dir " $cwd
cd ${cwd}

git pull

npm run build:prod
