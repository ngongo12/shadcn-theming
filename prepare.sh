echo "echo pre-deploy.sh"
echo "$1"
for folder in */
do
  if  [[ $folder =~ ^mo- ]] ;
  then
    echo "$folder"
    cd "$folder"
    git checkout "$1"
    git pull
    if [[ $1 = "deploy" ]]
    then
      sleep 2
      echo "run deploy script"
      # git merge develop-v2
    fi
    cd ../
  fi
done