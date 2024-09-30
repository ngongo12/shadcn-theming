echo 'set-up-core.sh'
src_folder=shared-core/config-core

cp -r shared-core/package.json .

cp -r shared-core/config-core/.lintstagedrc .
cp -r shared-core/config-core/set-up-core.sh .
cp -r shared-core/config-core/core.prettier.config.json ./prettier.config.js
#copy public folder to core
for folder in "$src_folder"/*
do
  cp -r $folder .
  echo $folder
done  