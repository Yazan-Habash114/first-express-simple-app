import { todos } from "../mockData/todos.js";
import express from "express";
const todosRouter = express.Router();

todosRouter.get("/", (req, res) => {
  res.send(todos);
});

// Middleware to check if the item exist
const validateItemExistence = (req, res, next) => {
  const id = req.params.id;
  const obj = todos.find((todo) => todo.id == id);
  if (!obj) res.status(404).send("Item not found");
  else req.obj = obj;
  next();
};

todosRouter
  .route("/:id")
  .put(validateItemExistence, (req, res) => {
    let oldObj = req.obj;
    let newObj = req.body;
    Object.keys(newObj).forEach((key) => {
      if (oldObj[key] !== newObj[key]) {
        oldObj[key] = newObj[key];
      }
    });
    res.send("Todo has been edited successfully");
  })
  .delete(validateItemExistence, (req, res) => {
    const id = req.params.id;
    if (todos.length != 0) {
      let objToDeleteIndex;
      todos.forEach((obj, index) => {
        if (obj.id == id) objToDeleteIndex = index;
      });
      todos.splice(objToDeleteIndex, 1);
      res.status(204).send();
    } else {
      res.status(422).send("Array is empty");
    }
  })
  .get(validateItemExistence, (req, res) => {
    res.send(req.obj);
  })
  .post(
    (req, res, next) => {
      if (req.body.title && req.body.description) next();
      else res.send("Title or description not exist");
    },
    (req, res) => {
      const id = req.params.id;
      const { title, description, completionStatus } = req.body;
      todos.push({
        id: id,
        title: title,
        description: description,
        completionStatus: completionStatus,
      });
      res.send("New todo added successfully");
    }
  );

export default todosRouter;
