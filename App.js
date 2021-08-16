import './App.css';
import React, { useState } from "react";


function ListItem(props) {
  const { children, onModify, onDelete } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  console.log({ isEditMode });
  const [tempTask, setTempTask] = useState(children);

  return isEditMode ? (
    <>
      <input
        className="editTask"
        onChange={function (event) {
          setTempTask(event.target.value);
        }}
        value={tempTask}
      ></input>
      <button
        className="btn1"
        type="button"
        disabled={tempTask === ''}
        onClick={function () {
          console.log('save click', tempTask);
          if (tempTask !== '') {
            onModify(tempTask);
            setIsEditMode(false);
          }
        }}
      >
        Save
      </button>
    </>
  ) : (
    <div className="List-style" >
    <div>
      <li className="list" key={children}>
        {children}
      </li>
      </div>
      <div>
      <button
        className="btn3"
        type="button"
        onClick={function () {
          setIsEditMode(true);
        }}
      >
        Edit
      </button>
      <button
        className="btn2"
        type="button"
        onClick={function () {
          onDelete();
        }}
      >
        Remove
      </button>
    </div>
    </div>
  );
}


export default function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);


  function onModify(givenTask, givenI) {
    console.log({ givenTask, givenI });
    const newList = todoList.map(function (task, i) {
      if (givenI === i) {
        return givenTask;
      }
      return task;
    });

    setTodoList(newList);
  }

  function onDelete(givenI) {
    const newList = todoList.filter(function (el, i) {
      return i !== givenI;
    });
    setTodoList(newList);
  }




  return (
    <div className="main-div">
      <div className="center-div">
        <br />
        <h1>ToDo List</h1>
        <br />
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={function (event) {
          setTask(event.target.value);
        }}
        />
        <button className="btn1" onClick={ function () {
          if (task !== '') {
            setTodoList([...todoList, task]);
            setTask('');
          }
        }}
        >
          {" "}
          Add{" "}
        </button>
        <ul className="todo-style">
        {todoList.map((task, i) => {
          return (
            <ListItem
              onModify={(newTask) => {
                onModify(newTask, i);
              }}
              onDelete={() => onDelete(i)}
            >
              {task}
            </ListItem>
          );
        })}
      </ul>
      </div>
    </div>
  );
}


