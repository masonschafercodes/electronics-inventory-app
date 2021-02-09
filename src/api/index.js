const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PORT = process.env.PORT || 9090;

let whitelist = ["http://localhost:3000"];

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this origin does not allow access from this particular origin";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
app.use(helmet());

app.get("/", (req, res) => {
  res.send({
    message: "Hello, World",
  });
});

//Add Item to Database
app.post("/item", async (req, res) => {
  try {
    const result = await prisma.item
      .create({
        data: {
          ...req.body,
        },
      })
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(result);
  } catch (e) {
    throw e;
  }
});

//Add person to Database
app.post("/person", async (req, res) => {
  try {
    const result = await prisma.person
      .create({
        data: {
          ...req.body,
        },
      })
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(result);
  } catch (e) {
    throw e;
  }
});

//Get All Items
app.get("/items", async (req, res) => {
  try {
    const items = await prisma.item
      .findMany()
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(items);
  } catch (e) {
    throw e;
  }
});

//Get All People
app.get("/people", async (req, res) => {
  try {
    const items = await prisma.person
      .findMany()
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(items);
  } catch (e) {
    throw e;
  }
});

//Get All People with Devices
app.get("/people-wo-items", async (req, res) => {
  try {
    const peopleWithOutItems = await prisma.person
      .findMany({
        where: {
          number_of_devices: {
            equals: 0,
          },
        },
      })
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(peopleWithOutItems);
  } catch (e) {
    throw e;
  }
});

//Get Unique Person by Id
app.get(`/person/:name`, async (req, res) => {
  const { name } = req.params;
  const personToFind = await prisma.person
    .findFirst({
      where: {
        last_name: name,
      },
    })
    .catch((e) => res.send({ message: e }))
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.json(personToFind);
});

//Get Unique Item by Id
app.get(`/item/:id`, async (req, res) => {
  const { id } = req.params;
  const itemToFind = await prisma.item
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .catch((e) => res.send({ message: e }))
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.json(itemToFind);
});

//Update Item by Id
app.put("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated_item = await prisma.item
      .update({
        where: {
          id: parseInt(id),
        },
        data: { ...req.body },
      })
      .catch((e) => res.send({ message: e }))
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(updated_item);
  } catch (e) {
    throw e;
  }
});

//Update Person by Id
app.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated_person = await prisma.person
      .update({
        where: {
          id: parseInt(id),
        },
        data: { ...req.body },
      })
      .catch((e) => {
        res.send({
          message: e,
        });
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.json(updated_person);
  } catch (e) {
    res.send({
      error: e,
    });
  }
});

//Delete Item by Id
app.delete(`/item/:id`, async (req, res) => {
  const { id } = req.params;
  const itemToDelete = await prisma.item
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .catch((e) => {
      res.send({
        message: e,
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.json(itemToDelete);
});

//Delete Person by Id
app.delete(`/person/:id`, async (req, res) => {
  const { id } = req.params;
  const personToDelete = await prisma.person
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .catch((e) => {
      res.send({
        message: e,
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.json(personToDelete);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
