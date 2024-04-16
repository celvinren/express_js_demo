## To start a test Postgres database, run the following command:

docker compose up

## Access pdAdmin at http://localhost:5050

## Add your PostgreSQL server in pgAdmin:

Click on "Add New Server".
Give your server a name in the "General" tab.
Switch to the "Connection" tab.
As the hostname, enter postgres, which is the name of the Docker service defined in docker-compose.yml.
Enter the default PostgreSQL port 5432.
Use postgres as the maintenance database name.
Enter the username (default is postgres if you have not specified one).
Use the password you defined in the docker-compose.yml (postgres in the example).
Save the server configuration.

## install uuid extension on postgres

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
firstName VARCHAR(100),
lastName VARCHAR(100),
email VARCHAR(100)
);

INSERT INTO users (id, firstName,lastName, email) VALUES ('0b2f5864-0263-4f2b-bd11-32906292e2ba','Calvin','Ren', 'Calvin.Ren@example.com');

## Hot reload

npm install -g nodemon
nodemon app.js
