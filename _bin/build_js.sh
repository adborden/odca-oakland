#!/bin/bash

set -o errexit
set -o pipefail
set -x

js_asset_dir=_site/assets/js

mkdir -p $js_asset_dir

for entrypoint in src/*.js; do
  bundle_name=$(basename $entrypoint .js)
  bundle_js=${bundle_name}.bundle.js
  bundle_js_map=${bundle_js}.map
  bundle_min=${bundle_name}.bundle.min.js
  bundle_min_map=${bundle_min}.map

  # Browserify with sourcemaps, then extract the sourcemaps to separate file
  browserify --debug -t [ stringify --extensions [ .html ] ] -t browserify-ngannotate ${entrypoint} | \
    exorcist --base ${js_asset_dir} ${js_asset_dir}/${bundle_js_map} > \
    ${js_asset_dir}/${bundle_js}

  # Having the base_url from jekyll complicates things. We have to be explicit
  # with all the paths and names and remove the prefix created from js_asset_dir.
  uglifyjs --mangle --compress \
    --prefix 3 \
    --in-source-map ${js_asset_dir}/${bundle_js_map} \
    --source-map-url ${bundle_min_map} \
    --source-map ${js_asset_dir}/${bundle_min_map} \
    -o ${js_asset_dir}/${bundle_min} -- ${js_asset_dir}/${bundle_js}
done
