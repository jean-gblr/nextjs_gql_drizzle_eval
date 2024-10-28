"use client";

import { useQuery } from "@apollo/client";
import { Carousel, Spinner } from "flowbite-react";
import { TASKS_QUERY } from "../data/queries";
import { Task } from "@/server/database/schema";
import { AddAnotherTaskModal } from "./kanban/AddAnotherTaskModal";
import { Board } from "./kanban/content";
import { DeleteModal } from "./kanban/DeleteModal";
import { EditTaskModal } from "./kanban/EditTaskModal";

export function TaskCarousel() {
  const { loading, data } = useQuery(TASKS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Spinner aria-label="Loading tasks" />;

  return (
    <div className="mt-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {data.tasks.map((task: Task) => (
          <div
            key={task.id}
            className="mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800"
          >
            <div className="flex items-center justify-between pb-4">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {task.title}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
                {task.description}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center justify-start"></div>
                <div className="flex items-center justify-center rounded-lg bg-purple-100 px-3 text-sm font-medium text-purple-800 dark:bg-purple-200"></div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
