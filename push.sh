#!/usr/bin/env sh

# 当发生错误时终止脚本
npm run build

# cd 到构建输出目录下
cd dist

# 部署到自定义域名
# echo 'www.example.com' > CNAME
git init
echo "正在添加文件..."
git add -A
echo -n "正在提交备注...，请填写备注（可空）"
git commit -m 'deploy'

echo "正在开始提交代码..."

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f https://gitee.com/ren-chengkai/sh_h5 master
git remote add origin "https://gitee.com/ren-chengkai1/collect.git"
git push -f origin master

cd -