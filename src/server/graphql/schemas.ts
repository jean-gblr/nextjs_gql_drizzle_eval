// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
  # Could implement a scalar Date type if time permits
  # scalar Date
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Status" type defines the status of a task.
  enum Status {
    PENDING
    IN_PROGRESS
    DONE
  }

  # This "Task" type defines the queryable fields for every task in our data source.
  type Task {
    id: ID!
    title: String!
    description: String
    status: Status!
    createdAt: String
    updatedAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    tasks: [Task]
  }
`;
