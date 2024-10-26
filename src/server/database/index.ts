import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pkg from "pg";
import * as dbSchema from "./schema.js";

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema: dbSchema });

async function main() {
  const task: dbSchema.NewTask = {
    title: "Task 1",
    description: "Description 1",
    status: "PENDING",
  };
  await db.insert(dbSchema.tasks).values(task);
  console.log("New task created!");
  const tasks = await db.select().from(dbSchema.tasks);
  console.log("Getting all tasks from the database: ", tasks);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  await db
    .update(dbSchema.tasks)
    .set({
      description: "Description 1 updated",
    })
    .where(eq(dbSchema.tasks.title, "Task 1"));
  console.log("Task info updated!");
  // await db.delete(dbSchema.tasks).where(eq(dbSchema.tasks.title, "Task 1"));
  // console.log("Task deleted!");
}

main();
