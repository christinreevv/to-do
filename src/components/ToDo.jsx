import React, { useState, useEffect } from "react";
import NewTask from "./NewTask";
import "../scss/style.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Загрузка задач при монтировании
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5014/tasks");
        if (!response.ok) {
          throw new Error(`Ошибка загрузки задач: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        alert("Не удалось загрузить задачи. Проверьте соединение с сервером.");
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!inputText.trim()) {
      alert("Введите текст задачи!");
      return;
    }

    const newTask = { text: inputText.trim() };

    try {
      const response = await fetch("http://localhost:5014/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка добавления задачи.");
      }

      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setInputText("");
    } catch (error) {
      console.error("Ошибка добавления задачи:", error);
      alert("Не удалось добавить задачу.");
    }
  };

  return (
    <div className="main">
      <h1 className="title">Что планируешь сделать сегодня?</h1>

      <input
        type="text"
        className="inputText"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Введите название задачи"
      />

      <button className="addButton" onClick={addTask}>
        Добавить
      </button>

      <NewTask tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default ToDo;
