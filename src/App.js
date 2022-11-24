import React from "react"
import './App.css';
import Header from "./components/Header/Header.jsx"
import ReactModal from "react-modal";
import {useState} from 'react';
import * as Icon from 'react-feather';
function App() {
  ReactModal.setAppElement('#root');

  const [todos,setTodos]=useState([]);

  const addTodo=(title,desc)=>{
    setTodos([...todos,{title,desc}])
    console.log(title,desc,todos);
  }
  const deleteHandle=(index)=>{
    var deletedTodos=todos.filter((todo,i)=>{return i!=index? todo:""})
    setTodos(deletedTodos);
  }
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
            <span><Icon.Check /></span>{todo.title}
            <br/><small>{todo.desc}</small>
                <span onClick={()=>{deleteHandle(i)}}><Icon.X /></span></li>
        })}
      </ul>
      </div>
      
    </div>
  );
}

export default App;
