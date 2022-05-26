import logo from "./logo.svg";
import axios from "axios"
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page,setPage]=useState(Number([1]))
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [totalCount,settotalCount]=useState([]);
  const [limit,setLimit]=useState(2)
  console.log(page)
  useEffect(() => {
    axios
    .get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`)
    .then((d) => {
        setTodos(d.data);
        settotalCount(Number(d.headers["x-total-count"]))
        //console.log(data)
        //setTodos("")
      });
  }, [page,limit]);
  const safeInfo = () => {
    //call api to save this info
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
        value: newTodo,
        isCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos,data])
        setNewTodo("");
      });
  };
  const Delete=(id)=>{
    setTodos(todos.filter((todo)=>todo.id!=id));
   //setTodos([...dTodo])
  }
  return (
    <div className="App">
      <div>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={safeInfo}>+</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id}>{todo.value}
        <button
        
        onClick={()=>Delete(todo.id)}
        >Remove</button>
        </div>
      ))}
      <button
      disabled={page<=1}
      onClick={()=>
        {if(page>1)setPage(page - 1)}}
      >{`<`}</button>
      <select onChange={(e)=>setLimit(Number(e.target.value))}>
        <option value={2}>2</option>
        <option value={4}>4</option>
        <option value={6}>6</option>
      </select>
      <button
      disabled={page*limit>=totalCount}
      onClick={()=>setPage(page + 1)} 
      >{`>`}</button>
    </div>
  );
}

export default App;
