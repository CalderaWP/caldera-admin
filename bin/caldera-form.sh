#!/usr/bin/env bash

# Include useful functions
. "$(dirname "$0")/includes.sh"


# switch to this directory
# https://stackoverflow.com/a/24112741/1469799
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path";
pwd;

# Composer updates
echo -e $(status_message "Composer update Caldera Forms")
cd ././../vendor/Desertsnowman/caldera-forms/
pwd;
composer update --prefer-source -o;
echo -e $(status_message "Composer update Ghost Runner")
cd ../../calderawp/ghost-runner
pwd;
composer install --prefer-source -o;

# Activate plugins
cd "$parent_path";
cd ../
pwd;
echo -e $(status_message "Activate Caldera Forms in Docker container")
docker-compose run --rm cli wp plugin activate caldera-forms

echo -e $(status_message "Activate Caldera Forms Admin plugin in Docker container")
docker-compose run --rm cli wp plugin activate caldera-forms-admin

echo -e $(status_message "Activate Ghost runner in Docker container")
docker-compose run --rm cli wp plugin activate ghost-runner

# Import test forms
echo -e $(status_message "Import test forms with Ghost Runner")
docker-compose run --rm cli wp cgr import


