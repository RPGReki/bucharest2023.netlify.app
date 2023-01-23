#!/bin/bash

cd "$(git rev-parse --show-toplevel)/site" || exit 1

export JEKYLL_ENV=unpublished

bundle exec jekyll b --config _config.yml,_config.local.yml --future --watch

