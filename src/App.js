import React from "react"
import './App.css';
import Header from "./components/Header/Header.jsx"
import ReactModal from "react-modal";
import {useState,useEffect} from 'react';
import * as Icon from 'react-feather';
function App() {
  ReactModal.setAppElement('#root');

  const [todos,setTodos]=useState([]);

  const addTodo=(title,desc)=>{
    setTodos([...todos,{title,desc,completed:false}])
    console.log(title,desc,todos);
  }
  const deleteHandle=(index)=>{
    var deletedTodos=todos.filter((todo,i)=>{return i!=index? todo:""})
    setTodos(deletedTodos);
  }
  useEffect(()=>{
    if (localStorage.getItem("todos"))
       setTodos(JSON.parse(localStorage.getItem("todos")))
  },[])
  useEffect(()=>{
    if(todos!="")
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <div className="App">
      <Header 
      addTodo={addTodo}
      />
      <br/>
      <div className="todo-list">
      <ul>
        {todos.map((todo,i)=>{
          
          return <li key={i}>
              <div>
                <span>
                  {todo.completed? <Icon.Check /> :<Icon.Calendar />}
                </span>
              </div>
              <div>
                {todo.title}
                <br/><small>{todo.desc}</small>
              </div>
              <div>
                <span onClick={()=>{deleteHandle(i)}}>
                    <Icon.X />
                </span>
              </div>
            </li>
        })}
      </ul>
      </div>
      
    </div>
  );
}

export default App;
