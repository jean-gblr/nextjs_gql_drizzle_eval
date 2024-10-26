import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import { resolvers } from "./resolvers.js";
import { buildSchema } from "drizzle-graphql";
import { db } from "../database/index.js";

const { schema } = buildSchema(db);
const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return { db: db };
  },
});

console.log(`🚀 Server ready at ${url}`);
