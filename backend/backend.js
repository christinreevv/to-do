import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from './models/Task.js';

const app = express();

// Использование middleware
app.use(cors());
app.use(express.json()); // Добавьте это для обработки JSON-тел запросов

// ------------------------ server ------------------------

const port = 5014;

app.listen(port, (err) => {
  if (err) {
    console.log("Not OK");
  }
  console.log("OK");
});

// ------------------------ db connect ------------------------

mongoose
  .connect(
    "mongodb+srv://root:root@christinreev.gklin.mongodb.net/todo?retryWrites=true&w=majority&appName=christinreev"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("BD error", err));

// ------------------------ api ------------------------

// Получение всех задач
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Создание новой задачи
app.post("/tasks", async (req, res) => {
    try {
        console.log("Полученные данные:", req.body); // Лог входящих данных
        
        const { text } = req.body;

        // Проверка входящих данных
        if (typeof text !== 'string') {
            return res.status(400).json({ error: "Неверные данные: 'text' должен быть строкой." });
        }

        // Создание новой задачи с статусом false по умолчанию
        const newTask = new Task({ text, status: false });
        await newTask.save();

        // Отправка ответа
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Ошибка при создании задачи:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Обновление статуса задачи (выполнено/не выполнено)
app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Удаление задачи
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Задача удалена" });
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
