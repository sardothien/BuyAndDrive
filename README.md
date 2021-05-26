# Project Kupi-i-Vozi

"Kupi i vozi" is a web app which allows you to buy and sell used cars. It has advanced searches and possibility to save favourite listings, it also notifies the user when a new listing has been placed.

## Links to other doc files

- [Build procedure](https://gitlab.com/matfpveb/projekti/2020-2021/06-Kupi-i-Vozi/-/wikis/Build-procedure)
- [Persistent data description](https://gitlab.com/matfpveb/projekti/2020-2021/06-Kupi-i-Vozi/-/blob/master/documentation/ERDiagram.png)

## Developers

- [Luka Vujčić, 63/2017](https://gitlab.com/LukaVujcic)
- [Božidar Mitrović, 54/2017](https://gitlab.com/wade_wilson)
- [Dušan Petrović, 14/2017](https://gitlab.com/dpns98)
- [Aleksa Tešić, 121/2017](https://gitlab.com/Imafikus)
- [Mina Milošević, 81/2017](https://gitlab.com/mina.milosevic)



## Project Overview

Project consists of 2 distinct parts:

- 'server'
- 'client'

Both are in directories with the same name.

## Server

Server is written using NodeJS and Express libraries, with Typescript being the language of choice. We used PostgreSQL database.

In order to setup server, you'll need the following:

- `npm`
- `Docker`

**Important note:** Make sure that you are inside `server` directory before doing anything described below.

The local development Postgres database is set up using the provided Dockerfile in the root of the project. To generate a docker image, navigate to the root folder of the project and run:

> `docker build -t kupi_i_vozi_database .`

To start the database server on the localhost port 5432, run:

> `docker run -dp 5432:5432 kupi_i_vozi_database`

In order for Node application to be able to connect to the database, create the **`.env`** file, using the **`.env.example`** as a template and fill in the information about the database.

For the local development database described in the Dockerfile, you can use the following connection string:

> PGCONNECTION_STRING=postgresql://root:root@localhost:5432/kupi_i_vozi

To install needed Node packages, you can run:

> `npm install`  

Be sure that you are in the root of the project. Everything else should work just fine by itself.
You can test if everything is working by running:

> `npm run start`

After you've run this command go to `localhost:8080` and you should see the `Hello world!` message.

## Database migrations

If you want to change database structure you should create new migration file by running `npm run create-migration-skeleton` and immediately renaming it to something meaningful.

Server will automatically apply all pending migrations when it's started. If you want to delete all tables from the database run `npm run drop-all-tables`.

It's strongly advised that you use some kind of GUI client for connecting to the database (e.g. TablePlus).

## Code editor settings

It's advised that you use VS Code for development, if you decide to do that please install
[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), this will automatically pick up settings from `.editorconfig` file and apply it to this project.

This is done so we are sure that whole team has same editor settings in order to improve readability and avoid unnecesarry code changes.

## Sending emails

You will need throwaway gmail account where you should turn ON access to less secure apps. Go to account settings >> security and you should see the option. Keep in mind that it could be turned off without your input, don't know why, looks like default Google behavior. If the sending fails, you should check that.

## Using JWT

Value for JWT_SECRET_KEY in .env file can be whatever you like, as long as it's encoded to BASE64. See this site to get that done: <http://www.unit-conversion.info/texttools/base64/>

Same goes for every other JWT-related variable.

## Setting up Google Auth

- Go to the http://console.developers.google.com and create a new project
- Add Google+ API to the project
- Configure a basic OAuth consent screen, choose `external` option
- Add OAuth client ID credentials, choose `web application` option and set `Authorized JavaScript origins` to the URI or your client application (for development on localhost, use `http://localhost:<port>`)
- Copy the generated Client ID to the appropriate place in the `.env` file, as shown in the `.env.example`
- Make sure you have the same Client ID as on the backend.
