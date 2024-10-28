"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import KanbanPageContent from "../ui/kanban/content";

const tasksQuery = gql`
  query {
    boards {
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
        between columns to update their status.
      </p>
      {loading ? <p>Loading ...</p> : <KanbanPageContent boards={data.boards} />}
    </div>
  );
}
