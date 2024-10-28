"use client";
import { REMOVE_TASK_MUTATION, BOARDS_QUERY } from "@/app/data/queries";
import { Task } from "@/server/database/schema";
import { useMutation } from "@apollo/client";
import { Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface DeleteModalProps {
  task: Task;
}

export const DeleteModal: FC<DeleteModalProps> = function ({ task }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [removeTask] = useMutation(REMOVE_TASK_MUTATION, {
    refetchQueries: [{ query: BOARDS_QUERY }],
  });

  const handleDeleteTask = async (task: Task) => {
    try {
      await removeTask({
        variables: {
          where: {
            id: {
              eq: task.id,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      >
        <span className="sr-only">Delete {task.title}</span>
        <HiOutlineTrash className="h-5 w-5" />
      </button>
      <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Modal.Header>Delete {task.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the task &quot;{task.title}&quot;?
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="red"
            onClick={() => {
              handleDeleteTask(task);
              setOpenDeleteModal(false);
            }}
          >
            Delete
          </Button>
          <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
