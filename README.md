Add package to dev dependencies:
npm install --save-dev <package-name>
Add package to dependencies:
npm install <package-name>

## To start a test Postgres database, run the following command:

docker compose up

## Access pdAdmin at http://localhost:5050

## Add your PostgreSQL server in pgAdmin:

Click on "Add New Server".

"General" tab => server name: express_demo
"Connection" tab => 
hostname: postgres => which is the name of the Docker service defined in docker-compose.yml
port: 5432
database name: PostgreSQL (default)
username: postgres (default)
password: (defined POSTGRES_PASSWORD in the docker-compose.yml)

Save the server configuration.

## install uuid extension on postgres
Create script: 

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
first_name VARCHAR(100),
last_name VARCHAR(100),
password VARCHAR(100),
email VARCHAR(100)
);

INSERT INTO users (id, first_name,last_name, email) VALUES ('0b2f5864-0263-4f2b-bd11-32906292e2ba','Calvin','Ren', 'Calvin.Ren@example.com');

## Hot reload

npm install -g nodemon
nodemon src/app.ts

## Convert to typescript

npm install @types/node @types/express
npm install --save-dev typescript ts-node

Install typescript
npm install -g typescript
After this, you can run tsc --init to create a tsconfig.json file.
tsc
