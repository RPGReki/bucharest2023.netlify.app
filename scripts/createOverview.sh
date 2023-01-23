#!/bin/bash

cd "$(git rev-parse --show-toplevel)/site" || exit 1

for i in {amauga,crystaldown,scions,reincarnated-as-cat,_posts/amauga,_posts/crystaldown,_posts/general}; do
    (
        echo "Entering $i…"
        cd "$i" || return
        for j in [0-9]*; do
            (
                cd "$j" || return
                markdowny table --fields chapter title published day notes _words -- *.md | tee .overview
            )
        done
        echo "… done."
    )
done
