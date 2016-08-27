#!/usr/bin/env bash

set -o errexit
set -o pipefail

if [[ -z ${1} ]]; then
  echo $0: You must specify the frontend project directory. >&2
  exit 1
fi

base_dir=$(dirname $0)/..
base_path=$(realpath $base_dir)
frontend_project_dir=$(realpath $1)

less_dir=${base_path}/assets/less
scss_dir=${base_path}/_sass/frontend
app_dir=${frontend_project_dir}/app

mkdir -p ${less_dir}
mkdir -p ${scss_dir}

function copy_tree () {
  local src_dir=$1
  local dest_dir=$2
  local file_pattern=$3

  (
    cd ${src_dir}
    rsync --verbose --recursive --files-from=<(find . -name "${file_pattern}") ${src_dir}/ ${dest_dir}/
  )
}

copy_tree ${app_dir} ${less_dir} "*.less"

npm run less2sass ${less_dir}/

copy_tree ${less_dir} ${scss_dir} "*.scss"


function fix_mixin () {
  local mixin=$1
  local filename=$2
  sed -i -e "s/^\.\(${mixin}\)/@mixin \1/" ${scss_dir}/${filename}
}

fix_mixin creteRound-font-family components/common/styles/fonts.scss
fix_mixin divided-section components/common/styles/custom_mixins.scss
fix_mixin odca-contentBlock components/common/styles/contentBlock.scss
fix_mixin odca-flex-row components/common/linkList/linkListItem/linkListItem.scss
fix_mixin odca-linkListItem-flexRow components/common/linkList/linkListItem/linkListItem.scss
fix_mixin odca-flex-column components/common/linkList/linkListItem/linkListItem.scss
fix_mixin odca-linkListItem-indented components/common/linkList/linkListItem/linkListItem.scss
fix_mixin odca-linkListItem-contentRow--firstItem components/common/linkList/linkListItem/linkListItem.scss
fix_mixin text-brand-primary components/common/styles/utilities.scss


function sed_script () {
  cat <<EOF
s/\(@include container\)\>/\1-fixed/
s/&:extend(\(.*\))/@extend \1/
s/@include h4/@extend h4/
s/@include form-control/@extend .form-control/
s/@include text-center/@extend .text-center/
s/@include homepageText-subheader/@extend .homepageText-subheader/
s/@include pull-left/@extend .pull-left/
s/@include pull-right/@extend .pull-right/
s/@include text-left/@extend .text-left/
EOF
}

find ${scss_dir} -name "*.scss" | xargs sed -i -f <(sed_script)

# remove the vendor file
truncate --size 0 ${scss_dir}/vendor/vendor.scss

rm -rf ${less_dir}
