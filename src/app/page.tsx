"use client";

import { Carousel } from "flowbite-react";
import Link from "next/link";
import { TaskCarousel } from "./ui/TaskCarousel";

export default function Page() {
  return (
    <div>
      <main>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Home
          </span>{" "}
          View
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Behold the carousel of tasks ! (If you want to create, edit or delete
          tasks, please click{" "}
          <Link className="text-blue-500" href={"/kanban"}>
            here
          </Link>
          )
        </p>
        <TaskCarousel />
      </main>
    </div>
  );
}
