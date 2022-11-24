import React from "react"
import './App.css';
import Header from "./components/Header/Header.jsx"
import ReactModal from "react-modal";
import {useState,useEffect} from 'react';
import * as Icon from 'react-feather';
function App() {
  ReactModal.setAppElement('#root');
  const [filtered,setFiltered]=useState([]);
  const [todos,setTodos]=useState([]);
  const searchHandle=(text)=>{
    text?
    setFiltered(todos.filter((todo)=>{return todo.title.includes(text)? todo :""}))
    : setFiltered(todos);
    console.log(filtered,text);
  }
  const addTodo=(title,desc)=>{
    setTodos([...todos,{title,desc,completed:false}])
  }
  const deleteHandle=(index)=>{
    var deletedTodos=todos.filter((todo,i)=>{return i!==index? todo:""})
    setTodos(deletedTodos);
  }
  const checkHandle=(index)=>{
    var updatedTodo=todos[index];
    updatedTodo.completed=!updatedTodo.completed;
    var checkedTodos=todos.filter((todo,i)=>{return i!=index? todo :updatedTodo});
    setTodos(checkedTodos);
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
      searchHandle={searchHandle}
      />
      <br/>
      <div className="todo-list">
      <ul>
        
        {
         
        filtered.map((todo,i)=>{
          
          return <li key={i}>
              <div>
                <span onClick={()=>{checkHandle(i)}}>
                  {todo.completed? <Icon.Check /> :<Icon.Calendar />}
                </span>
              </div>
              <div className={todo.completed? "completed":""}>
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
