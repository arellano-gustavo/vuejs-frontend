docker run -it -p 7777:8080 \
-v $1/frontend/src:/structure/src \
kebblar/crypto-trader bash /run.sh

