import { gql } from "@apollo/client";

export const ADD_TASK_MUTATION = gql`
  mutation AddTask($values: [TasksInsertInput!]!) {
    insertIntoTasks(values: $values) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const TASKS_QUERY = gql`
  query {
    boards {
      id
      title
      tasks {
        id
        title
        description
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTasks($set: TasksUpdateInput!, $where: TasksFilters) {
    updateTasks(set: $set, where: $where) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_TASK_MUTATION = gql`
  mutation RemoveTask($where: TasksFilters) {
    deleteFromTasks(where: $where) {
      id
    }
  }
`;