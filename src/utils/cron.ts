import cron from "node-cron";

cron.schedule("43 22 * * *", () => {
  console.log("Runs every day at 10:43 PM");
});

export default cron;
