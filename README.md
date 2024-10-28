This is a evaluation project. The app is a task manager. Front-end runs with next.js. Database is postgres that runs on docker. We use drizzle as an ORM and a graphql server to interact with the database.

## Getting Started

First, be sure to have docker and pnpm installed on your system.
This project is setup using node 20.18.10.
You can check your node version by running:

```bash
node -v
```

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

### Setup database schema

Now we need to create the database schema. Run the following command:

```bash
npx drizzle-kit push
```

### Run the GraphQL server

You can run the GraphQL server with the following command:
This will build the javascript files and start the server.

```bash
pnpm start:graphql
```

You should see the following message:

```bash
🚀 Server ready at http://localhost:4000/
New task created!
```

Do not close this terminal. The server is running.

Note that the database has been seeded with some tasks.

### Run the Next.js app

Open a new terminal to run the Next.js app.

You can run the Next.js app with the following command:

```bash
pnpm start
```

Finally you can access the app on your browser at http://localhost:3000/