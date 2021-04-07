# Project Kupi-i-Vozi

"Kupi i vozi" is a web app which allows you to buy and sell used cars. It has advanced searches and possibility to save favourite listings, it also notifies the user when a new listing has been placed.

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

## Code editor settings

It's advised that you use VS Code for development, if you decide to do that please install
[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), this will automatically pick up settings from `.editorconfig` file and apply it to this project.

This is done so we are sure that whole team has same editor settings in order to improve readability and avoid unnecesarry code changes.

## Sending emails

You will need throwaway gmail account where you should turn ON access to less secure apps. Go to account settings >> security and you should see the option. Keep in mind that it could be turned off without your input, don't know why, looks like default Google behavior. If the sending fails, you should check that.

To properly redirect users using the email link when resetting the password, set the `FRONTEND_URL` environment variable to desired frontend URL, as shown in the `.env.example`.

## Setting up client