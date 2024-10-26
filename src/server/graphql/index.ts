import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Status" type defines the status of a task.
  type Status {
    PENDING,
    IN_PROGRESS,
    DONE
  }

  # This "Task" type defines the queryable fields for every task in our data source.
  type Task {
    id: ID!
    title: String
    description: String
    status: Status
    createdAt: Date
    updatedAt: Date
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    tasks: [Task]
  }
`;

const tasks = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    status: "IN_PROGRESS",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    status: "DONE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
