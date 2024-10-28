import { faker } from "@faker-js/faker";
import * as dbSchema from "./schema.js";

export function generateFakeData(): dbSchema.NewTask[] {
  const statuses: dbSchema.NewTask["status"][] = [
    "Pending",
    "In Progress",
    "Completed",
  ];
  const fakeTasks: dbSchema.NewTask[] = [];

  for (let i = 0; i < 10; i++) {
    const task: dbSchema.NewTask = {
      title: faker.lorem.words(5), // Random sentence with 5 words
      description: faker.lorem.paragraph(3), // Random paragraph with 3 sentences
      status: faker.helpers.arrayElement(statuses), // Randomly select a status
    };

    fakeTasks.push(task);
  }

  return fakeTasks;
}
