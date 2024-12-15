import React, {useState,useRef} from "react";
import {useDispatch} from 'react-redux'
import {addTodo} from '../../reducer/todo/todo'
export default function AddToDo(){

  const [todoText, setTodoText] = useState('');
  const ref = useRef();
  const dispatcher = useDispatch();
  const handleChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(todoText != ''){
      dispatcher(addTodo(todoText))
      setTodoText('');
    }else{
      ref.current.focus()
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
      <div className="flex gap-4 justify-center items-center align-middle">
      <input
        ref={ref}
        type="text"
        value={todoText}
        onChange={handleChange}
        placeholder="Enter your todo..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
        Add Todo
      </button>

      </div>
    </form>
  );
};
