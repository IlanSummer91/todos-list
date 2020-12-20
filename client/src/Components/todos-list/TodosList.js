import React, { useEffect, useRef } from 'react';
import { Todo } from './todo/Todo';
import './TodosList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getTodos, toggleAll } from '../../store/todosAction';

export function TodosList() {
  
  const todoRef = useRef("");
  const todos = useSelector(({todosReducer}) => todosReducer.todos);
  const dispatch = useDispatch();
  const toggleChecker = useSelector(({todosReducer}) => todosReducer.toggleChecker);
  const mode = useSelector(({todosReducer}) => todosReducer.mode);
  const todosArrayNotEmpty = useSelector(({todosReducer}) => todosReducer.todosArrayNotEmpty);
  
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const addTodoHandler = (e) => {
    e.preventDefault();
    const todo = { content: todoRef.current.value, completed: false };
    dispatch(addTodo(todo, mode));
    todoRef.current.value = "";
  }

  return (
    <div className="todos-list">
      <form 
        className="add-todo-container" onSubmit={(e) => addTodoHandler(e)}>
        {todosArrayNotEmpty ?
          (<div className="toggle-todos">
            <input 
              checked={toggleChecker} onChange={() => dispatch(toggleAll(mode))} 
              type="checkbox" className="checkbox">
            </input>
          </div>) : 
          (<div className="toggle-todos"></div>)
      }
        
        <input 
          type="text" ref={todoRef} placeholder="What needs to be done?" 
          className="add-todo">
        </input>
      </form>
      {
        todos.map(todo => <Todo todo={todo} key={todo._id}></Todo>)
      }
    </div>
    )
}

