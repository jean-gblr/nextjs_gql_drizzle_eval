"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import KanbanPageContent from "../ui/kanban/content";
import { Spinner } from "flowbite-react";

const tasksQuery = gql`
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

export default function Page() {
  const { loading, error, data } = useQuery(tasksQuery, {
    variables: { language: "english" },
  });

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Kanban
        </span>{" "}
        View
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Visualise your tasks in a Kanban board. You can drag and drop tasks
        between columns to update their status. (Drag and drop functionality is
        not yet implemented, it will be a bonus if time permits)
      </p>
      {loading ? (
        <Spinner aria-label="Loading tasks" />
      ) : (
        <KanbanPageContent boards={data.boards} />
      )}
    </div>
  );
}
