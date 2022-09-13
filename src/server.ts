import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient({ log: ["warn", "error", "info", "query"] });
app.use(cors());
app.use(express.json());
const port = 4000;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { hobbies: true } });
  res.send(users);
});
app.get("/users/:id", async (req, res) => {
  const users = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { hobbies: true },
  });
  if (users) {
    res.send(users);
  } else {
    res.status(404).send({ error: "user not found" });
  }
});

app.post("/users", async (req, res) => {
  // const users = await prisma.user.create({
  //   data: req.body,
  //   include: { hobbies: true },
  // });
  // res.send(users);
  const userData = {
    full_name: req.body.full_name,
    photo_URL: req.body.photo_URL,
    email: req.body.email,
    hobbies: req.body.hobbies ? req.body.hobbies : [],
  };

  const users = await prisma.user.create({
    data: {
      full_name: req.body.full_name,
      photo_URL: req.body.photo_URL,
      email: req.body.email,
      hobbies: {
        // @ts-ignore
        connectOrCreate: userData.hobbies.map((hobby) => ({
          where: { full_name: hobby },
          create: { full_name: hobby },
        })),
      },
    },
  });
  res.send(users);
});

app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.params.id) },
  });
  res.send(user);
});

app.patch("/users/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
    include: { hobbies: true },
  });
  res.send(user);
});

app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobby.findMany({ include: { users: true } });
  res.send(hobbies);
});
app.get("/hobbies/:id", async (req, res) => {
  const hobbies = await prisma.hobby.findUnique({
    where: { id: Number(req.params.id) },
    include: { users: true },
  });
  res.send(hobbies);
});

app.delete("/hobbies/:id", async (req, res) => {
  const hobby = await prisma.hobby.delete({
    where: { id: Number(req.params.id) },
  });
  res.send(hobby);
});

app.patch("/hobbies/:id", async (req, res) => {
  const hobby = await prisma.hobby.update({
    where: { id: Number(req.params.id) },
    data: req.body,
    include: { users: true },
  });
  res.send(hobby);
});

app.listen(port, () => {
  console.log(`App running: http://localhost:${port}`);
});
