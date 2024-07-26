import React, { useState, useRef, useEffect } from "react";
import titleImg from "../assets/images/icon.png";
import TodoItems from "./TodoItems";
import Swal from 'sweetalert2'
const Todo = () => {


  const [items, setItems] = useState(
    localStorage.getItem('todolist')
      ?JSON.parse(localStorage.getItem('todolist'))
      :[]
    );
  const [currentTime, setcurrentTime] = useState(new Date());
  const inputRef = useRef();


  useEffect(() =>{
    const interval = setInterval(() => {
      setcurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  },[])

useEffect(()=>{
  localStorage.setItem('todolist', JSON.stringify(items))
},[items])
  
  const formattedTime =  currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })+" - "+
  currentTime.toLocaleDateString('en-US', {year: 'numeric',day: 'numeric', month: 'numeric',  }) ;

  const AddHandler = (e) => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      alert("لطفا یک متن وارد کنید");
      return null;
    }
    const mydate = () => {
      const date = 
      new Date(Date.now()).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })+" - "+
      new Date(Date.now()).toLocaleDateString('en-US', {year: 'numeric',day: 'numeric', month: 'numeric',  })
      return date;
    };
    const newItem = {
      id: items.length + 1,
      text: inputText,
      date: mydate(),
      isDone: false,
    };
    setItems((prev) => [...prev, newItem]);
    inputRef.current.value = "";
  };
  const delHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setItems((prvitems)=>{
          return prvitems.filter((item) => item.id !== id)
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
         timerProgressBar: true,
          timer: 1000,
          // showConfirmButton: false
          
        });
      }
    });
  
  }
  const toggleHandler = (id) => {
    setItems((prvitems)=>{
      return prvitems.map((item) =>{
        if (item.id===id) {
          return {...item, isDone: !item.isDone};
        }
        return item;
      })

    })
  }

  return (
    <div className="bg-white rounded-xl place-self-center w-11/12 max-w-xl p-7 flex flex-col  h-[600px]  overflow-auto ">
      {/* ------------title---------- */}
      <p className="text-right text-gray-400 " >{formattedTime}</p>
      <div className="flex items-center  mt-7 gap-2">
        <img className="w-11" src={titleImg} alt="" />
        <h1 className="text-3xl font-semibold">To-DO List</h1>
      </div>

      {/* ------------Input Box---------- */}

      <div className="flex items-center my-7  rounded-full bg-gray-200">
        <input
          ref={inputRef}
          className="bg-transparent border-0  pl-6 pr-2 h-14 rounded-l-full    placeholder:text-slate-600 outline-none flex-1"
          type="text"
          placeholder="Add your task "
        />
        <button
          onClick={AddHandler}
          className="text-white border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium cursor-pointer hover:scale-105  "
        >
          Add +
        </button>
      </div>
      {/* ------------todo list ---------- */}
      <div >
        {items.map((item) => (
          // <TodoItems key={item.id} text={item.text} id={item.id} mydate={item.date} isDone={item.isDone} delHandler={delHandler}/>
          <TodoItems key={item.id} {...item}  delHandler={delHandler} toggleHandler={toggleHandler}/>
        ))}
      </div>
    </div>
  );
};

export default Todo;
// text={item.text} id={item.id} isdone={item.isdone}
