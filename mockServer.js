import express from "express";
import { faker } from "@faker-js/faker";

const app = express();
const port = process.env.PORT || 3000;

function generateMessages(count) {
  const priority = ["low", "high"];

  return Array.from(Array(count).keys()).map(() => ({
    id: faker.string.uuid(),
    content: faker.lorem.lines({ min: 1, max: 3 }),
    priority: priority[Math.floor(Math.random() * priority.length)],
    timestamp: new Date().toISOString(),
    read: false,
  }));
}

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/messages", (req, res) => {
  res.json({ messages: generateMessages(Number(req?.query?.count) || 1) });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
