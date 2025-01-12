import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/style.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/todo");
  };

  return (
    <>
      <div class="blob"></div>
      <div className="container">
        <h1 className="gradient-text">
          Начни успевать больше, <br /> чем 97% людей{" "}
        </h1>
        <p class="review">Планирование — твой ключ к успеху.</p>{" "}
        <div className="main__button">
          <button
            className="button"
            onClick={handleNavigate}
            style={{ fontSize: "16px" }}
          >
            Приступить
          </button>
        </div>
      </div>
      <div class="blob-1"></div>
    </>
  );
};

export default StartPage;
