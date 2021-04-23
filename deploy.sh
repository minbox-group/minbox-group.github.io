#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

docsite build

ssh-add ~/.ssh/id_rsa_minbox_group_github

# 将变动内容提交到码云仓库
git add .
git commit -m "$1"
git push origin master
