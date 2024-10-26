import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(title: String!, description: String, status: String!): Task
    updateTask(id: ID!, status: String!): Task
    deleteTask(id: ID!): Boolean
  }
`;