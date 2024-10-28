"use client";

import { gql, useMutation } from "@apollo/client";
import {
  Modal,
  Label,
  TextInput,
  Textarea,
  Button,
  Badge,
} from "flowbite-react";
import { FC, useState } from "react";
import { HiPlus } from "react-icons/hi";

interface AddAnotherTaskModalProps {
  status?: string;
}

const ADD_TASK_MUTATION = gql`
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

export const AddAnotherTaskModal: FC<AddAnotherTaskModalProps> = function ({
  status = "Pending",
}) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [insertIntoTasks, { data, loading, error }] =
    useMutation(ADD_TASK_MUTATION);

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
      setSelectedStatus("Pending");
      setOpen(false);
    } catch (e) {
      console.error("Error adding task:", e);
    }
  };

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
            <Button color="blue" onClick={handleAddTask}>
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
