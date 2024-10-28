"use client";

import { useMutation } from "@apollo/client";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { FC, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Board } from "./content";
import { Task } from "@/server/database/schema";
import { ADD_TASK_MUTATION, TASKS_QUERY } from "@/app/data/queries";

interface AddAnotherTaskModalProps {
  status?: string;
}

export const AddAnotherTaskModal: FC<AddAnotherTaskModalProps> = function ({
  status = "Pending",
}) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [insertIntoTasks, { loading, error }] = useMutation(ADD_TASK_MUTATION, {
    optimisticResponse: ({ values }) => ({
      insertIntoTasks: values.map((task: Task) => ({
        __typename: "Task",
        id: Math.random().toString(36).substring(7), // Temporary unique ID
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    }),
    update: (cache, { data: { insertIntoTasks } }) => {
      // Read the existing boards from the cache
      const existingData: { boards: Board[] } = cache.readQuery({
        query: TASKS_QUERY,
      }) || { boards: [] };

      // Fallback to empty arrays if data is missing
      const existingBoards = existingData?.boards || [];

      // Flatten the existing boards to get a single array of tasks
      const existingTasks = existingBoards.flatMap((board) => board.tasks);

      // Merge existing tasks with the newly inserted ones
      const updatedTasks = [...existingTasks, ...insertIntoTasks];

      // Function to find the existing board's ID by status
      const findBoardIdByStatus = (status: string) => {
        const board = existingBoards.find((board) => board.title === status);
        if (board) {
          return board.id;
        } else {
          return "wrong";
        }
        // return board ? board.id : null; // Return null if no board with that status is found
      };

      // Group tasks by their status to create the updated boards
      const updatedBoards = ["Pending", "In Progress", "Completed"].map(
        (status) => ({
          id: findBoardIdByStatus(status),
          title: status,
          tasks: updatedTasks.filter((task) => task.status === status),
        })
      );

      // Write the updated boards back to the cache
      cache.writeQuery({
        query: TASKS_QUERY,
        data: {
          boards: updatedBoards,
        },
      });
    },
  });

  const handleAddTask = async () => {
    try {
      await insertIntoTasks({
        variables: {
          values: [
            {
              title: taskName,
              description: description,
              status: selectedStatus,
            },
          ],
        },
      });

      // Reset form and close modal after successful addition
      setTaskName("");
      setDescription("");
      setSelectedStatus(status);
      setOpen(false);
    } catch (e) {
      console.error("Error adding task:", e);
    }
  };

  const isAddButtonDisabled = !taskName || !description;

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-200 px-5 py-2 font-semibold text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add new task
      </button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>Add new task</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-6 grid grid-cols-1 gap-y-2">
              <Label htmlFor="taskName">Task name</Label>
              <TextInput
                id="taskName"
                name="taskName"
                placeholder="Redesign homepage"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-y-2">
              <Label htmlFor="description">Enter a description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="On line 672 you ..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center gap-x-3">
            <Button
              color="blue"
              onClick={handleAddTask}
              disabled={isAddButtonDisabled}
            >
              <div className="flex items-center gap-x-2">
                <HiPlus className="text-lg" />
                Add card
              </div>
            </Button>
            <Button color="gray" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
