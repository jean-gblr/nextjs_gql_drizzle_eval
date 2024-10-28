import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "drizzle-graphql";
import { db } from "../database/index.js";
import { customResolvers } from "./resolvers.js";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const { entities } = buildSchema(db);

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      tasks: entities.queries.tasks,
      task: entities.queries.tasksSingle,
      boards: {
        type: new GraphQLList(
          new GraphQLObjectType({
            name: "Board",
            fields: {
              id: { type: GraphQLInt },
              title: { type: GraphQLString },
              tasks: { type: new GraphQLList(entities.types.TasksItem) },
            },
          })
        ),
        resolve: customResolvers.Query.boards,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: entities.mutations,
  }),
  // In case you need types inside your schema
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return { db: db };
  },
});

console.log(`🚀 Server ready at ${url}`);
