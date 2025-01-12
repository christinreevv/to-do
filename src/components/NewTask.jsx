import React, { useState } from "react";
import "../scss/style.css";

const NewTask = ({ tasks = [], setTasks }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  // Удаление задачи
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5014/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Ошибка удаления задачи. Код: ${response.status}`);
      }

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу. Попробуйте еще раз.");
    }
  };

  // Переключение статуса выполнения задачи
  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    const updatedTask = { ...task, status: !task.status };

    try {
      const response = await fetch(`http://localhost:5014/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedTask.status }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления задачи. Код: ${response.status}`);
      }

      const updatedTasks = tasks.map((t) =>
        t._id === taskId ? updatedTask : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
      alert("Не удалось обновить задачу. Попробуйте еще раз.");
    }
  };

  // Начало редактирования задачи
  const startEditing = (task) => {
    setEditTaskId(task._id);
    setEditText(task.text);
  };

  // Завершение редактирования задачи
  const finishEditing = async () => {
    if (!editText.trim()) {
      alert("Текст задачи не может быть пустым.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5014/tasks/${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления задачи. Код: ${response.status}`);
      }

      const updatedTasks = tasks.map((task) =>
        task._id === editTaskId ? { ...task, text: editText.trim() } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditText("");
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
      alert("Не удалось обновить задачу. Попробуйте еще раз.");
    }
  };

  // Отмена редактирования
  const cancelEditing = () => {
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <li
          className="taskItem"
          key={task._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            className="inputCheck"
            type="checkbox"
            checked={task.status}
            onChange={() => toggleTaskCompletion(task._id)}
            style={{
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          {editTaskId === task._id ? (
            <input
              className="taskEditInput"
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={finishEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing();
                if (e.key === "Escape") cancelEditing();
              }}
              autoFocus
              style={{
                flex: 1,
                padding: "5px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          ) : (
            <span
              className="taskText"
              onDoubleClick={() => startEditing(task)}
              style={{
                marginLeft: "8px",
                textDecoration: task.status ? "line-through" : "none",
                color: task.status ? "gray" : "white",
                opacity: task.status ? 0.6 : 1,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {task.text}
            </span>
          )}
          <button
            className="deleteButton"
            onClick={() => deleteTask(task._id)}
            style={{
              marginLeft: "auto",
              cursor: "pointer",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NewTask;
