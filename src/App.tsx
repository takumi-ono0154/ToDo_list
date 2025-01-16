import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">ToDoリスト</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex mb-4">
          <input 
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputValue}
            className="input input-bordered w-full max-w-xs"
            placeholder="新しいToDoを入力"
          />
          <input
            type="submit"
            value="＋"
            className="btn btn-active ml-2"
          />
        </form>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-4">
              <input 
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                value={todo.inputValue}
                className={`input input-bordered w-full max-w-xs ${todo.checked ? 'bg-gray-300' : ''}`}
                disabled={todo.checked}
              />
              <input 
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
                checked={todo.checked}
                className="checkbox"
              />
              <button 
                onClick={() => handleDelete(todo.id)} 
                className="p-3 w-12 bg-red-500 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
