const http = require("http");
const ErrorHandler = require("./controller/errorHandler");
const TodosController = require("./controller/todo.controller");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const apiRoute = "api";
  const TodosRoute = `/${apiRoute}/todos`;
  const SingleTodosRoute = /\/api\/todos\/[a-zA-Z0-9]*/;
  const { url, method } = req;
  console.log(url.match(SingleTodosRoute));
  if (url == TodosRoute && method == "GET") {
    TodosController.get(req, res);
  } else if (url.match(SingleTodosRoute) && method == "GET") {
    TodosController.getById(req, res);
  } else if (url == TodosRoute && method == "POST") {
    TodosController.create(req, res);
  } else if (url.match(SingleTodosRoute) && method == "PUT") {
    TodosController.update(req, res);
  } else if (url.match(SingleTodosRoute) && method == "DELETE") {
    TodosController.remove(req, res);
  } else {
    ErrorHandler.notFound(res);
  }
});

server.listen(PORT);
console.log(`run server on Port: ${PORT}`, `http://localhost:${PORT}`);
