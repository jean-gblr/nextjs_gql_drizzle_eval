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
import { useMutation } from "@apollo/client";
import { UPDATE_TASK_MUTATION, TASKS_QUERY } from "@/app/data/queries";

interface EditTaskModalProps {
  task: Task;
}

export const EditTaskModal: FC<EditTaskModalProps> = function ({ task }) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [updateTask, { error }] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: [{ query: TASKS_QUERY }],
  });

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

  if (error) return `Update error! ${error.message}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        <span className="sr-only">Edit Task</span>
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
              <div className="flex items-center gap-x-2">Cancel</div>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
