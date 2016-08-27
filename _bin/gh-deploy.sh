#!/bin/bash

set -o errexit
set -o pipefail

repo_name=$1
build_dir=$2


bin_dir=$(dirname $0)
project_dir=$(realpath ${bin_dir}/..)

if [ -z "$GITHUB_TOKEN" ]; then
    echo "GITHUB_TOKEN is required." >&2
    exit 1
fi

if [[ -z $repo_name ]]; then
  echo "$0: Usage gh-deploy.sh <repo owner/repo name> [build_dir] " >&2
  exit 1
fi

if [[ -z $build_dir ]]; then
  build_dir=${project_dir}/_site
fi

GITHUB_REPO="github.com/${repo_name}"

# Clean
rm -rf $build_dir

# Build
if [[ -x ./_bin/build.sh ]]; then
  ./_bin/build.sh
else
  jekyll build
fi

# Copy CNAME
[[ -e ./CNAME ]] && cp CNAME $build_dir/

# Git init
cd $build_dir
git --version
git init
git config user.name "GH Pages deploy script"
git config user.email "user@example.com"
git add .
git commit -m "Deploy to GH Pages"
git push --force --quiet "https://x-api-token:${GITHUB_TOKEN}@${GITHUB_REPO}.git" master:gh-pages &> /dev/null
