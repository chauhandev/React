import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../../reducer/todo/todo';

const ToDos = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      {/* <h1 className="text-3xl font-semibold mb-6 text-center">Todo List</h1> */}
      <ul className="space-y-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-md ${
              todo.isCompleted ? 'bg-gray-200 line-through' : 'bg-white'
            }`}
          >
            <span className="text-gray-800">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDos;
