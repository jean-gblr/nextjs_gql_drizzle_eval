export const customResolvers = {
  Query: {
    // Add your custom tasks resolver here
    boards: async (_, __, { db }) => {
      // Fetch all tasks from the database using Drizzle
      const allTasks = await db.select().from("tasks");

      // Group tasks by status
      const groupedTasks = allTasks.reduce((acc, task) => {
        // Find the existing group by status
        let group = acc.find((g) => g.title === task.status);

        // If no group exists for this status, create a new one
        if (!group) {
          group = {
            title: task.status,
            tasks: [],
          };
          acc.push(group);
        }

        // Add the task to the correct group
        group.tasks.push(task);
        return acc;
      }, []);

      return groupedTasks;
    },
  },
};
