This is a evaluation project. The app is a task manager. Front-end runs with next.js. Database is postgres that runs on docker. We use drizzle as an ORM and a graphql server to interact with the database.

## Getting Started

First, run the development server:

```bash
pnpm install
```

Download and setup the postgres database on docker:
Install docker on your system, following instructions on the link:
https://www.docker.com/products/docker-desktop/

### Pull the postgres image from docker hub
```bash
docker pull postgres
```

### Run the postgres container
```bash
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

### Setup .env

rename the file .env.example to .env and fill the variables with the following values:

To connect to the PostgreSQL database, you need to provide the database URL. The URL format is:

```bash
postgres://<user>:<password>@<host>:<port>/<database>
```

So with our example, the URL would be:

```bash
postgres://postgres:mypassword@localhost:5432/postgres
```

The .env file should look like this:

```bash
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
```

npx drizzle-kit push