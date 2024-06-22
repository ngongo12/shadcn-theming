echo "link-package.sh"
cp -Rf package.json shared-core/package.json

#copy folder public to shared-core
src_folder=shared-core/config-core
root=public
cp -r $root $src_folder
# cd shared-core
# git add .
# git commit -m "update package.json"
# cd ..