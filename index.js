import express, { json } from "express";
import todosRouter from "./routes/todosRouter.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
const port = 4444;
app.use(express.static("public"));
app.use(json());
app.use("/todos", todosRouter);

// Endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
