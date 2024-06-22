echo 'set-up-core.sh'
src_folder=shared-core/config-core
#init sub-modules
git submodule init
git submodule update --recursive

yarn set-up
