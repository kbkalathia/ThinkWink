import cron from "node-cron";
import TodoModel from "../models/todo.model";

cron.schedule("0 0 * * *", async () => {
  console.log("Running Cron Job - Checking for expired todoss..!!");

  try {
    const now = new Date();

    const result = await TodoModel.updateMany(
      {
        dueDate: { $lt: now },
        completed: false,
      },
      {
        completed: true,
      }
    );

    console.log(
      `CRON Job Completed: ${result.modifiedCount} todos marked as completed.`
    );
  } catch (error) {
    console.error("Error: ", (error as Error).message);
  }
});
