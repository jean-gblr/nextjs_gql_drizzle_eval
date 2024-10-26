// import { tasks, Task } from '../database/schema';

// export const resolvers = {
//   Query: {
//     tasks: async (_parent, _args, context) => {
//       // Fetch tasks from the PostgreSQL database using Drizzle
//       const results: Task[] = await context.db.select().from(tasks);
//       return results;
//     },
//   },
//   Mutation: {
//     addTask: async (_parent, { title, description, status }, context) => {
//       // Insert a new task into the PostgreSQL database
//       const [newTask] = await context.db
//         .insertInto(tasks)
//         .values({ title, description, status })
//         .returning('*');
//       return newTask;
//     },
//     updateTask: async (_parent, { id, status }, context) => {
//       // Update a task's status in the PostgreSQL database
//       const [updatedTask] = await context.db
//         .update(tasks)
//         .set({ status })
//         .where('id', '=', id)
//         .returning('*');
//       return updatedTask;
//     },
//     deleteTask: async (_parent, { id }, context) => {
//       // Delete a task from the PostgreSQL database
//       await context.db.deleteFrom(tasks).where('id', '=', id);
//       return true;
//     },
//   },
// };