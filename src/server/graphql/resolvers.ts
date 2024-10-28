export const customResolvers = {
  Query: {
    // Add your custom tasks resolver here
    boards: async (
      source: any,
      args: any,
      context: { db: { query: { tasks: { findMany: () => any } } } },
      info: any
    ) => {
      // Resolve all tasks from the database
      const allTasks = await context.db.query.tasks.findMany();
      let i = 0;
      // Group tasks by status
      const groupedTasks = allTasks.reduce(
        (acc: any[], task: { status: any }) => {
          // Find the existing group by status
          let group = acc.find((g) => g.title === task.status);

          // If no group exists for this status, create a new one
          if (!group) {
            group = {
              id: i++,
              title: task.status,
              tasks: [],
            };
            acc.push(group);
          }

          // Add the task to the correct group
          group.tasks.push(task);
          return acc;
        },
        []
      );

      // Define the desired order of statuses
      const statusOrder = ["Pending", "In Progress", "Completed"];
      groupedTasks.sort(
        (a: { title: string }, b: { title: string }) =>
          statusOrder.indexOf(a.title) - statusOrder.indexOf(b.title)
      );

      return groupedTasks;
    },
  },
};
