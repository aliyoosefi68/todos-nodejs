const TodosModel = require("../model/todo.model");

async function get(req, res) {
  try {
    const todos = await TodosModel.find();
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(todos));
    res.end();
  } catch (error) {
    console.log(error);
  }
}
async function create(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const todo = { ...JSON.parse(body), createdAt: new Date() };
      const result = await TodosModel.create(todo);
      res.writeHead(201, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}

async function update(req, res) {
  try {
    let body = "";
    const id = req.url.split("/")[3];
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const parsedBody = { ...JSON.parse(body) };
      const todo = await TodosModel.findById(id);
      if (!todo) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });
        res.write(
          JSON.stringify({
            message: "Not Found any todo",
          })
        );
        res.end();
      } else {
        const result = await TodosModel.update(id, parsedBody);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function getById(req, res) {
  try {
    const id = req.url.split("/")[3];
    console.log(req.url);
    const todo = await TodosModel.findById(id);
    if (!todo) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(
        JSON.stringify({
          message: "Not Found any todo",
        })
      );
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(todo));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

async function remove(req, res) {
  try {
    const id = req.url.split("/")[3];
    const todo = await TodosModel.findById(id);
    if (!todo) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(
        JSON.stringify({
          message: "Not Found any Todo",
        })
      );
      res.end();
    } else {
      const result = await TodosModel.remove(id);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(result));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

const TodosController = {
  get,
  getById,
  update,
  create,
  remove,
};
module.exports = TodosController;
