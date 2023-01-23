#!/bin/bash

root="$(git rev-parse --show-toplevel)"

pandoc \
  "${root}/site/_site/crystaldown/01-life-in-avan-forest/ebook/index.html" \
  -o "${root}/site/crystaldown/01-life-in-avan-forest/ebook.epub" \
  --epub-cover-image="${root}/site/crystaldown/01-life-in-avan-forest/cover.jpg" \
  --epub-embed-font="${root}/site/assets/fonts/*.ttf" \
  --data-dir "${root}/site/_site/assets/2020/css" \
  --metadata-file="${root}/site/_data/books/crystal-down-volume-01.yml" \
  -f html+raw_html \

ebook-polish \
  -u -e -H \
  "${root}"/site/crystaldown/01-life-in-avan-forest/ebook{,_polished}.epub

mv "${root}"/site/crystaldown/01-life-in-avan-forest/{ebook_polished,crystaldown-01}.epub

rm "${root}"/site/crystaldown/01-life-in-avan-forest/ebook.epub

