import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "./database/db.js";
import dotenv from "dotenv";
import DataModel from "./schema/data_schema.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded());

dotenv.config();

ConnectDB();

app.get("/get-data", async (request, response) => {
  try {
    const res = await DataModel.find({});
    response.status(200).json(res);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/upload-data", (request, response) => {
  try {
    const data = request.body;
    console.log(data);
    if (data.length > 0) {
      const newData = DataModel(data[data.length - 1]);
      newData.save();
      response.status(200).json(data);
    }
    // response.status(200).json({ response: "data empty" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get("/update-to-todo/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await DataModel.findOneAndUpdate(
      { Id: id },
      { status: "TODO" },
      { upsert: true }
    );
    response.status(200).json({ res: "task updated to todo" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});
app.get("/update-to-doing/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await DataModel.findOneAndUpdate(
      { Id: id },
      { status: "DOING" },
      { upsert: true }
    );
    response.status(200).json({ res: "task updated to doing" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});
app.get("/update-to-done/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await DataModel.findOneAndUpdate(
      { Id: id },
      { status: "DONE" },
      { upsert: true }
    );
    response.status(200).json({ res: "task updated to done" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.post("/update-title-desc/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const data = request.body;
    console.log(id, data);
    await DataModel.findOneAndUpdate(
      { Id: id },
      { title: data.title, description: data.desc },
      { upsert: true }
    );
    response.status(200).json({ res: "title and description updated" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get("/delete/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await DataModel.deleteOne({ Id: id });
    response.status(200).json({ res: "deleted a task" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
