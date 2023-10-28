import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    document.querySelector(".task-input").value = "";
  }, [tasks]);

  const handleTaskAdd = () => {
    const inp = document.querySelector(".task-input").value;
    if (inp === "") {
      window.alert("Please input a task!!!");
      return;
    }
    setTask([...tasks, inp]);
  };

  return (
    <section className="task-container">
      <article className="task-banner">
        <div className="header">
          <input type="text" className="task-input" placeholder="Input Task" />
          <button type="button" className="task-submit" onClick={handleTaskAdd}>
            Add
          </button>
          <h3>Tasks</h3>
        </div>
        <div className="task-list">
          <ul>
            {tasks.map((task, i) => {
              return (
                <li className="task" key={i}>
                  {task}
                  <i
                    className="fas fa-xmark remove"
                    onClick={() => {
                      setTask(
                        tasks.filter((task, index) => {
                          if (index != i) return task;
                        })
                      );
                    }}
                  ></i>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default App;
