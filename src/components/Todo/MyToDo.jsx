import React from "react";
import AddToDo from "./AddToDo";
import ToDos from "./ToDos";

const MyToDo = ()=>{

    return (
        <>
        <div className="flex flex-col items-center bg-gray-100 p-4">
            <AddToDo/>
            <ToDos/>
        </div>
        </>
    )
}

export default MyToDo;