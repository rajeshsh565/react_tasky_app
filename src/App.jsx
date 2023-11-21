import { useState, useEffect } from "react";
import "./App.css";
import "animate.css";
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
    parent.animate([
      {
        transform: "Scale(0.9)"
      },
      {
        transform: "Scale(1)"
      }
    ],500);
    if (current.classList.contains("fa-pen-to-square")) {
      sibling.classList.remove("fa-xmark");
      current.classList.remove("fa-pen-to-square");
      current.classList.add("fa-check");
      parent.style.border = "2px solid black";
      parent.style.borderRadius = "5px";
      parent.setAttribute("contentEditable", "true");
      parent.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
          event.preventDefault();
        }
      })
    } else {
      sibling.classList.add("fa-xmark");
      current.classList.remove("fa-check");
      current.classList.add("fa-pen-to-square");
      parent.setAttribute("contentEditable", "false");
      parent.style.border = "none";
      parent.animate([
        {
          transform: "Scale(1.1)"
        },
        {
          transform: "Scale(1)"
        }
      ],500);
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
                  <li
                    className={"task  animate__animated animate__slideInDown animate__fast"}
                    key={i}
                  >
                    {task}
                    <i
                      className="fas fa-xmark remove"
                      onClick={(event) => {
                        const element = event.currentTarget.parentElement;
                        element.animate([
                          {
                            transform: "translate3D(0,0,0)"
                          },
                          {
                            visibility: "hidden",
                            transform: "translate3D(0,-100% , 0)"
                          }
                        ],350);
                        setTimeout(() => {
                          setTask(
                            tasks.filter((task, index) => {
                              if (index != i) return task;
                            })
                          );
                        }, 350);
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
