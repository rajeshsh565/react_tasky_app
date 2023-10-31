import { useState, useEffect } from "react";
import "./App.css";
import FlipMove from "react-flip-move";

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
  const handleTaskEdit = (e, i) => {
    const current = e.currentTarget;
    const sibling = e.currentTarget.previousSibling;
    const parent = e.currentTarget.parentElement;
    if (current.classList.contains("fa-pen-to-square")) {
      sibling.classList.remove("fa-xmark");
      current.classList.remove("fa-pen-to-square");
      current.classList.add("fa-check");
      parent.style.border = "2px solid black";
      parent.style.borderRadius = "5px";
      parent.setAttribute("contentEditable", "true");
    } else {
      sibling.classList.add("fa-xmark");
      current.classList.remove("fa-check");
      current.classList.add("fa-pen-to-square");
      parent.setAttribute("contentEditable", "false");
      parent.style.border = "none";
      const newTasks = [...tasks];
      newTasks[i] = parent.innerText;
      setTask([...newTasks]);
      // tasks[i] = parent.textContent;
      // setTask([...tasks]);
    }
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
          <FlipMove>
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
                      contentEditable="false"
                    ></i>
                    <i
                      className="fas fa-pen-to-square edit"
                      onClick={(e) => handleTaskEdit(e, i)}
                      contentEditable="false"
                    ></i>
                  </li>
                );
              })}
            </ul>
          </FlipMove>
        </div>
      </article>
    </section>
  );
};

export default App;
