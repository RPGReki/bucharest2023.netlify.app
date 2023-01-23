#!/bin/bash

cd "$(git rev-parse --show-toplevel)/site" || exit 1

bundle exec jekyll b --config _config.yml --future

# rm -rf site/2019 site/2020 site/2021

