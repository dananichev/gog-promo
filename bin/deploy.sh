#!/usr/bin/env bash

npm run dist

rm -rf /home/dananichev/projects/tolookat.me/public_html/gog-promo/*
mv dist/* /home/dananichev/projects/tolookat.me/public_html/gog-promo/
