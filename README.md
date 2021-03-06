# Caldera (Forms) Admin

Caldera Admin v2.

Requires the `project/admin-refactor` branch of Caldera Forms. Which is used by the built in local environment.

[![Maintainability](https://api.codeclimate.com/v1/badges/79cb58ea98b87f591771/maintainability)](https://codeclimate.com/github/CalderaWP/caldera-admin/maintainability)

## Goals
This is a WordPress plugin (for now) that replaces the main Caldera Forms admin screen with a new React app that replaces our old admin page with a new form list, form creation UI, a more powerful and extendable entry viewer, and moves the settings for Caldera Forms Pro, general settings, privacy settings, etc to one single interface.

I suspect this will become a composer package that goes in Caldera Forms and other Caldera plugins.

### Components:
This plugin/ whatever makes use of Caldera PHP and JavaScript modules.

* Caldera Interop - PHP entities for our data types that transform to and from array, JSON, PSR-7 HTTP message. Provides special service container.
* Caldera Containers - PHP. container and service container.
* Caldera Query Builder - PHP. SQL queries for Caldera Forms data
* Caldera Admin Client - React app for managing Caldera (Forms) forms, entry data and settings.
* Caldera DB - PHP library for config-driven database abstraction (WordPress `wpdb` only for now) for creating and querying MySQL database tables.
* Caldera Components - Config-driven React library using Gutenberg components.
* Caldera State - State management for Redux and `@wordpress/data`.
* Caldera API Client - JavaScript API client for Caldera (Forms) data and settings.
* Caldera Forms Pro API Client - PHP api client for read/write Caldera Forms Pro data.

## Responsibilities
This plugin is responsible for:
* Dependency management
* Wiring Caldera Interop to WordPress REST API.
* PHP classes for adding menus and other WordPress UI.
* Adding Caldera Forms database structure if not present.
* Replacing old admin screen with fallbacks.
* Compiling and optimizing assets.

## Development

### Install
Requires git and Composer.

NOTE: It is not recommended at this time to install this. It does not work yet.

* `git clone git@github.com:calderawp/caldera-admin.git`
* `cd caldera-admin`
* `composer install`
* `yarn`

### Install Local Development Environment
A  local development environment is included, and provided. It is used for integration tests. Requires Composer, Docker and Docker Compose.

* Install Local Environment And WordPress "Unit" Test Suite
- `composer wp:install`
* Activate plugins and import test forms
- `composer cf:install`

You should now have WordPress at [http://localhost:8888/](http://localhost:8888/)
* Username: admin
* password: password

### Using Already Installed Local Development Environment

* (re)Start Server: Once server is installed, you can start it again
- `composer wp:start`

* (re)Activate Plugins
- `composer cf:activate`

* (re)Set WordPress permalinks
- `composer wp:config`

### Testing With Local Environment
Tests will also run in Travis on each push. You should also run tests locally as you develop.

#### Install Test Suites
Follow the steps above to create local development environment, then you can use the commands listed in the next section.

#### Use
Run these commands from the plugin's root directory.

* Run All php Test, Sniffs and Lints
    - `composer tests`
* Run php Unit Tests
    - `composer tests:unit`
* Run WordPress Integration Tests
    - `composer wp:tests`
* Fix All Code Formatting
    - `composer formatting`
* Run JavaScript Unit Test Watcher
    - `yarn test`
* Run JavaScript Unit Tests Once
    - `yarn test:once`
* Run JavaScript Unit Tests Once and Report Coverage
    - `yarn test:coverage`
    
    
### Type-checking With Flow
* `yarn flow`


### Release To npm
Must be [logged in as project maintainer via npm cli](https://docs.npmjs.com/cli/adduser)

* `yarn release`
    - Release a patch update
    - Increments third position of a version. 1.0.1 -> 1.0.2
* `yarn release:minor`
    - Release a minor update
    - Increments second position of a version. 1.0.1 -> 1.1.0 
* `yarn release:major`
    - Release a major update
    - Increments second position of a version. 1.0.1 -> 2.0.0 
    
These commands run the tests and linter, and if they pass, re-compiles source, rebuilds docs, updates the version using [npm version](https://docs.npmjs.com/cli/version), adds a git tag, makes a git commit for the version change and updates the module on npm.
