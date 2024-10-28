"use client";

import {
  HiPencilAlt,
  HiDocumentText,
  HiClipboardList,
  HiDocumentRemove,
} from "react-icons/hi";
import { FC, useState } from "react";
import { Task } from "@/server/database/schema";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { gql, useMutation } from "@apollo/client";
import { Board, tasksQuery } from "./content";
import { desc } from "drizzle-orm";

const UPDATE_TASK_MUTATION = gql`
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

export const EditTaskModal: FC<Task> = function ({ task }) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [updateTask, { data, loading, error }] =
    useMutation(UPDATE_TASK_MUTATION);
  // const [updateTask, { data, loading, error }] = useMutation(
  //   UPDATE_TASK_MUTATION,
  //   {
  //     optimisticResponse: {
  //       updateTasks: {
  //         __typename: "TasksItem",
  //         id: task.id,
  //         title: title,
  //         description: description,
  //         status: selectedStatus,
  //         createdAt: task.createdAt,
  //         updatedAt: new Date().toISOString(),
  //       },
  //     },
  //   update: (cache, { data: { updateTasks } }) => {
  //     console.log("updateTasks", updateTasks);
  //     // Read the existing data from the cache
  //     const existingData: { boards: Board[] } = cache.readQuery({
  //       query: tasksQuery,
  //     }) || { boards: [] };
  //     console.log("existingData", existingData);

  //     // Find the original board's task and remove the task that has the same id as the updated task
  //     const updatedBoards = existingData.boards.map((board) => {
  //       return {
  //         ...board,
  //         tasks: board.tasks.filter((t) => t.id !== updateTasks.id),
  //       };
  //     });

  //     // Find the target board by matching the updated task's status and add the updated task to the board
  //     const targetBoard = updatedBoards.find(
  //       (board) => board.title === selectedStatus
  //     );
  //     if (!targetBoard) return;
  //     targetBoard.tasks.push(updateTasks);
  //     console.log("targetBoard", targetBoard);

  //     console.log("updatedBoards", updatedBoards);

  //     // Write the updated data back to the cache
  //     cache.writeQuery({
  //       query: tasksQuery,
  //       data: {
  //         boards: updatedBoards,
  //       },
  //     });
  //   },
  // }
  // );

  const handleSubmit = async () => {
    try {
      await updateTask({
        variables: {
          where: {
            id: {
              eq: task.id,
            },
          },
          set: {
            title: title,
            description: description,
            status: selectedStatus,
          },
        },
      });
      // Reset form or close modal after successful update
      setTitle("");
      setDescription("");
      setSelectedStatus("Pending");
      setOpen(false);
    } catch (e) {
      console.error("Error updating task:", e);
    }
  };

  const isAddButtonDisabled = !title || !description;

  if (error) return `Update error! ${error.message}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        <span className="sr-only">Edit card</span>
        <HiPencilAlt className="h-5 w-5" />
      </button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Edit task</Modal.Header>
        <Modal.Body>
          <div className="mb-3 text-2xl font-semibold leading-none text-gray-900 dark:text-white">
            <div className="mb-6 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Task name</Label>
              <TextInput
                id="taskName"
                name="taskName"
                placeholder="Redesign homepage"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5 flex flex-col items-start justify-center space-y-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created at&nbsp;
              {task.createdAt}
            </div>
          </div>
          <div className="mb-2 inline-flex items-center text-center text-lg font-semibold text-gray-900 dark:text-white">
            <HiDocumentText className="mr-1 h-5 w-5" />
            Description
          </div>
          <div className="mb-4 space-y-2 text-base text-gray-500 dark:text-gray-400">
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Textarea
                id="description"
                name="description"
                placeholder="On line 672 you ..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-y-2">
            <Label htmlFor="description">Task Status</Label>
            <div className="flex flex-wrap gap-2">
              <Button.Group>
                <Button
                  color={selectedStatus === "Pending" ? "blue" : "gray"}
                  onClick={() => setSelectedStatus("Pending")}
                >
                  Pending
                </Button>
                <Button
                  color={selectedStatus === "In Progress" ? "blue" : "gray"}
                  onClick={() => setSelectedStatus("In Progress")}
                >
                  In Progress
                </Button>
                <Button
                  color={selectedStatus === "Completed" ? "blue" : "gray"}
                  onClick={() => setSelectedStatus("Completed")}
                >
                  Completed
                </Button>
              </Button.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="grid w-full grid-cols-2 items-center gap-3 sm:grid-cols-5">
            <Button color="blue" onClick={handleSubmit}>
              <div className="flex items-center gap-x-2">
                <HiClipboardList className="h-5 w-5" />
                Save
              </div>
            </Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              <div className="flex items-center gap-x-2">
                <HiDocumentRemove className="h-5 w-5" />
                Delete
              </div>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
