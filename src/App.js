import React from "react"
import './App.css';
import Header from "./components/Header/Header.jsx"
import ReactModal from "react-modal";
import {useState,useEffect} from 'react';
import * as Icon from 'react-feather';
function App() {
  ReactModal.setAppElement('#root');
  const [filtered,setFiltered]=useState([]);
  const [search,setSearch]=useState('');
  const [todos,setTodos]=useState([]);
  const searchHandle=(text)=>{
    text?
    setFiltered(todos.filter((todo)=>{return todo.title.includes(text)? todo :""}))
    : setFiltered(todos);
  }
  const addTodo=(title,desc)=>{
    let id=todos? todos.length:0;
    setTodos([...todos,{id:id,title,desc,completed:false}])
  }
  const deleteHandle=(id)=>{
    var deletedTodos=todos.filter((todo)=>{return todo.id!==id? todo:""})
    setTodos(deletedTodos);
    console.log(deletedTodos,id);
  }
  const checkHandle=(id)=>{
    var updatedTodos=todos.map((todo)=>{
      if(todo.id==id)
      {
        var temp=todo;
        temp.completed=!temp.completed;
        return temp;
      }
      else
      {
        return todo;
      }
    });
    console.log(updatedTodos);
    setTodos(updatedTodos);
  }
  useEffect(()=>{
    if (localStorage.getItem("todos"))
    {
      setTodos(JSON.parse(localStorage.getItem("todos")))
      setFiltered(JSON.parse(localStorage.getItem("todos")))
    }
  },[])
  useEffect(()=>{
    if(todos!="")
    {
      localStorage.setItem("todos",JSON.stringify(todos))
      
      searchHandle(search)
    }
    
  },[todos])
  return (
    <div className="App">
      <Header 
      addTodo={addTodo}
      searchHandle={searchHandle}
      search={search}
      setSearch={setSearch}
      />
      <br/>
      <div className="todo-list">
      <ul>
        {
        filtered.map((todo,i)=>{
          
          return <li key={i}>
              <div>
                <span onClick={()=>{checkHandle(todo.id)}}>
                  {todo.completed? <Icon.Check /> :<Icon.Calendar />}
                </span>
              </div>
              <div className={todo.completed? "completed":""}>
                {todo.title}
                <br/><small>{todo.desc}</small>
              </div>
              <div>
                <span onClick={()=>{deleteHandle(todo.id)}}>
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
