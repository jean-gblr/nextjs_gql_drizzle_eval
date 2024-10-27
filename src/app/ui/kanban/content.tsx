// Use apollo client to get all tasks

"use client";
import { Task } from "@/server/database/schema";
import type { FC } from "react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const boardStatuses = ["Pending", "In Progress", "Completed"];

const KanbanPageContent: FC<{ tasks: Task[] }> = function ({ tasks }) {
  const [list, setList] = useState<Task[]>(tasks);

  return (
    // map tasks to columns using the status field
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="mb-6 flex items-start justify-start space-x-4 px-4">
          {boardStatuses.map((board) => (
            <div key={board}>
              <div className="py-4 text-base font-semibold text-gray-900 dark:text-gray-300">
                {board}
              </div>
              <div className="mb-6 space-y-4">
                <ReactSortable
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
                >
                  {board.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800"
                    >
                      <div className="flex items-center justify-between pb-4">
                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                          {task.name}
                        </div>
                        <EditCardModal />
                      </div>
                      <div className="flex flex-col">
                        {task.attachment && (
                          <div className="relative mb-3 aspect-video w-full">
                            <Image
                              alt=""
                              fill
                              src={task.attachment}
                              className="rounded-lg"
                            />
                          </div>
                        )}
                        <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
                          {task.description}
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center justify-start">
                            {task.members.map((member) => (
                              <Fragment key={member.id}>
                                <Link href="#" className="-mr-3">
                                  <Image
                                    alt={member.name}
                                    height={28}
                                    src={`/images/users/${member.avatar}`}
                                    width={28}
                                    className="rounded-full border-2 border-white dark:border-gray-800"
                                  />
                                </Link>
                                <div className="invisible absolute z-50 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                  {member.name}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                          <div className="flex items-center justify-center rounded-lg bg-purple-100 px-3 text-sm font-medium text-purple-800 dark:bg-purple-200">
                            <HiClock className="mr-1 h-4 w-4" /> 7 days left
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>
              <AddAnotherCardModal />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// function Result({ data }: { data: Task[] }) {
//   return (
//     <div>
//       <span className="text-gray-300">{JSON.stringify(data)}</span>
//     </div>
//   );
// }

export default KanbanPageContent;
