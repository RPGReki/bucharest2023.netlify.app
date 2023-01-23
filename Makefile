SHELL = /bin/bash

# user configuration

URL = https://bucharest2023.netlify.app

# automation begins here
GLOBAL_XML = /sitemap.xml 

PARTICIPANTS_FILES = site/_data/tournaments/202305/participants.json

COMMON_NORMAL_PREREQUESITES = 

COMMON_ORDER_ONLY_PREREQUESITES = $(PARTICIPANTS_FILES)

# imported files are phony to force re-importing
.PHONY: clean diff-tables submit-sitemap

default: production

## Build Tasks
testing: $(COMMON_NORMAL_PREREQUESITES) | $(COMMON_ORDER_ONLY_PREREQUESITES) .make-state-env-testing 
	JEKYLL_ENV=unpublished bundle exec jekyll b --config _config.yml,_local.yml -q

staging: $(COMMON_NORMAL_PREREQUESITES) | $(COMMON_ORDER_ONLY_PREREQUESITES) .make-state-env-staging
	JEKYLL_ENV=production bundle exec jekyll b --config _config.yml,_local.yml -q

production: $(COMMON_NORMAL_PREREQUESITES) | $(COMMON_ORDER_ONLY_PREREQUESITES) .make-state-env-production
	JEKYLL_ENV=production bundle exec jekyll b --incremental -q

.make-state-env-testing:
	@if [[ -f ".make-state-env-staging" || -f ".make-state-env-production" ]]; then JEKYLL_ENV=unpublished bundle exec jekyll b --config _config.yml,_local.yml; fi
	touch $(@)

.make-state-env-staging: 
	@if [[ -f ".make-state-env-testing" || -f ".make-state-env-production" ]]; then JEKYLL_ENV=production bundle exec jekyll b --config _config.yml,_local.yml; fi
	touch $(@)

.make-state-env-production:
	@if [[ -f ".make-state-env-testing" || -f ".make-state-env-staging" ]]; then JEKYLL_ENV=production bundle exec jekyll b; fi
	touch $(@)

deploy install: production
	@if [[ ! -z "$$(git status --porcelain)" ]]; then echo Repository is not clean. Please commit your changes.; exit 1; fi
	netlify deploy --production --message="$(shell git log --oneline -1)"

## Build Tasks: Tags

site/tags: $(PERSONAL_POSTS_IMPORT_DEST) $(STORY_POSTS_IMPORT_DEST) | docs
	@rm -rf site/tags
	bash docs/.dev/createTags.sh

docs: | $(PERSONAL_POSTS_IMPORT_DEST) $(STORY_POSTS_IMPORT_DEST)
	jekyll b -q

## Build Tasks: Cleaning

force-rebuild:
	rm -rf docs/*

clean:
	rm -rf docs site/tags site/_data/comments.json .make-state-*

## Build Tasks: Get Remote Data

site/_data/comments.json:
	gulp get-comments

site/_data/tournaments/202305/%:
	gulp get-$(*:.json=)

## Additional Tasks: Netlify
serve:
	@exec netlify dev

## Additional Tasks: Collect Writing Statistics

create-tables: $(STORY_POSTS_IMPORT_SRC) $(PERSONAL_POSTS_IMPORT_SRC)
	bash scripts/createTables.sh

diff-tables: $(STORY_POSTS_IMPORT_SRC) $(PERSONAL_POSTS_IMPORT_SRC)
	bash scripts/diffTables.sh

## Additional Tasks: Render Audio

audio: $(STORY_CHAPTER_AUDIO_DEST) $(PERSONAL_POSTS_AUDIO_DEST)

%.loudnorm-16.json: %.ssml.mp3
	ffmpeg -hide_banner \
		-i $(<) \
		-af loudnorm=I=-16:TP=-1.5:LRA=11:dual_mono=true:print_format=json \
		-f null - 2>&1 | tail -n 12 | tee $(@)

%.loudnorm-14.json: %.ssml.mp3
	ffmpeg -hide_banner \
		-i $(<) \
		-af loudnorm=I=-14:TP=-1.5:LRA=11:dual_mono=true:print_format=json \
		-f null - 2>&1 | tail -n 12 | tee $(@)

%.wav: %.ssml.mp3 %.loudnorm-16.json
	ffmpeg -hide_banner -loglevel error -stats -y \
		-i $(<) \
		-af loudnorm=I=-16:TP=-1.5:LRA=11:dual_mono=true:linear=true:$(shell grep -v output $(@:.wav=.loudnorm-16.json) | grep -v type | tr -d '\n' | sed -e 's/\s//g' -e 's/["\{\}]//g' -e 's/:/=/g' -e 's/,/:/g' -e 's/input_/measured_/g' -e 's/target_offset/offset/'):print_format=summary \
		-metadata gerne=Audiobook \
		-ar 48000 \
		$(@)

%.2.m4a: %.ssml.mp3 %.loudnorm-16.json
	ffmpeg -hide_banner -loglevel error -stats -y \
		-i $(<) \
		-af loudnorm=I=-16:TP=-1.5:LRA=11:dual_mono=true:linear=true:$(shell grep -v output $(@:.2.m4a=.loudnorm-16.json) | grep -v type | tr -d '\n' | sed -e 's/\s//g' -e 's/["\{\}]//g' -e 's/:/=/g' -e 's/,/:/g' -e 's/input_/measured_/g' -e 's/target_offset/offset/'):print_format=summary \
		-metadata gerne=Audiobook \
		-ar 48000 \
		-b:a 64k \
		$(@)

%.42.m4a: %.wav
	-@rm -f $(@)
	exhale 2 $(<) $(@)

%.aac: %.ssml.mp3 %.loudnorm-16.json
	ffmpeg -hide_banner -loglevel error -stats -y \
		-i $(<) \
		-af loudnorm=I=-16:TP=-1.5:LRA=11:dual_mono=true:linear=true:$(shell grep -v output $(@:.aac=.loudnorm-16.json) | grep -v type | tr -d '\n' | sed -e 's/\s//g' -e 's/["\{\}]//g' -e 's/:/=/g' -e 's/,/:/g' -e 's/input_/measured_/g' -e 's/target_offset/offset/'):print_format=summary \
		-ar 24000 \
		-b:a 32k \
		$(@)

%.mp3: %.ssml.mp3 %.loudnorm-14.json
	ffmpeg -hide_banner -loglevel error -stats -y \
		-i $(<) \
		-af loudnorm=I=-14:TP=-1.5:LRA=11:dual_mono=true:linear=true:$(shell grep -v output $(@:.mp3=.loudnorm-14.json) | grep -v type | tr -d '\n' | sed -e 's/\s//g' -e 's/["\{\}]//g' -e 's/:/=/g' -e 's/,/:/g' -e 's/input_/measured_/g' -e 's/target_offset/offset/'):print_format=summary \
		-ar 48000 \
		-b:a 96k \
		$(@)

## Additional Tasks: Submit Sitemaps

submit: $(addprefix submit-,$(GLOBAL_XML))

define SUBMIT
submit-$(1):
	curl -s "https://www.google.com/ping?sitemap=$$(URL)$(1)" > /dev/null
	curl -s "https://www.bing.com/ping?sitemap=$$(URL)$(1)" > /dev/null
	curl -s "https://webmaster.yandex.ru/ping?sitemap=$$(URL)$(1)" > /dev/null
endef

$(foreach xml,$(GLOBAL_XML),$(eval $(call SUBMIT,$(xml))))
