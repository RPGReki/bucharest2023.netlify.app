#!/bin/bash

cd "$(git rev-parse --show-toplevel)/site" || exit 1

bundle exec jekyll b --config _config.yml,_config.local.yml --future --watch

