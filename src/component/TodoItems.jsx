import React, {  useState } from "react";
import tick from "../assets/images/tick.png";
import not_tick from "../assets/images/not_tick.png";
import delIcon from "../assets/images/delete.png";
const TodoItems = ({text,id,isDone,delHandler,date,toggleHandler}) => {




  return (
    <>


      <div  className="flex  items-center gap-2 rounded-full  select-none">
        <div onClick={()=>toggleHandler(id)} className="flex  flex-1 items-center cursor-pointer  ">
          <img className="w-7  block" src={isDone ? tick : not_tick} alt="" />
          <p className={`text-slate-600 flex-1  ml-2 text-[17px] ${isDone ?"line-through":""}`} >{text}</p>
        </div>
        <img onClick={()=>delHandler(id)} src={delIcon} className="w-3.5 cursor-pointer hover:scale-125 " alt="" />
      </div>
      <p className="text-slate-400 cursor-pointer select-none text-center text-[12px] pt-1 text-sm mb-2">{date}</p>
      <hr className="mb-2 mx-auto  w-5/6"  />
   
    </>
  );
};

export default TodoItems;
