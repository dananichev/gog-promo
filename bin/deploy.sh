#!/usr/bin/env bash

npm run dist

rm -rf /projects/tolookat.me/public_html/gog-promo/*
mv dist/* /projects/tolookat.me/public_html/gog-promo/
