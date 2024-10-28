// Use apollo client to get all tasks

"use client";
import { Task } from "@/server/database/schema";
import { type FC } from "react";

import { AddAnotherTaskModal } from "./AddAnotherTaskModal";
import { Spinner } from "flowbite-react";
import { useQuery } from "@apollo/client";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteModal } from "./DeleteModal";
import { TASKS_QUERY } from "@/app/data/queries";

export interface Board {
  id: number;
  title: string;
  tasks: Task[];
}

const KanbanPageContent: FC = function () {
  const { loading, data } = useQuery(TASKS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Spinner aria-label="Loading tasks" />;

  return (
    // map tasks to columns using the status field
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="mb-6 flex items-start justify-start space-x-4 px-4">
          {data.boards.map((board: Board) => (
            <div key={board.id}>
              <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
                {board.title}
                <AddAnotherTaskModal status={board.title} />
              </div>
              <div className="mb-6 space-y-4">
                {/* <ReactSortable
                  animation={100}
                  forceFallback
                  group="kanban"
                  list={board.tasks}
                  setList={(tasks) =>
                    setList((list) => {
                      const newList = [...list];
                      const index = newList.findIndex(
                        (item) => item.id === board.id
                      );
                      newList[index].tasks = tasks;
                      return newList;
                    })
                  }
                > */}
                {board.tasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className="mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between pb-4">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {task.title}
                      </div>
                      <div>
                        <DeleteModal task={task} />
                        <EditTaskModal task={task} />
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
                {/* </ReactSortable> */}
              </div>
              <AddAnotherTaskModal status={board.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanPageContent;
