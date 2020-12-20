import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editCompleted, currentTodoClicked, editTodo } from '../../../store/todosAction';
import './Todo.scss';

export function Todo(props) {
  
  const dispatch = useDispatch()
  const mode = useSelector(({todosReducer}) => todosReducer.mode);
  const currentTodoClickedId = useSelector(({todosReducer}) => todosReducer.currentTodoClicked)
  const editRef = useRef(null);

  const deleteDoubleClickHandler = (e) => {
    e.stopPropagation();
  }

  const currentTodoClickedHandler = () => {
    dispatch(currentTodoClicked(props.todo._id));
  }

  const editContent = () => {
    const content = editRef.current.value;
    if (content !== "") {
      props.todo.content = content;
      dispatch(editTodo(props.todo, mode));
    }
    dispatch(currentTodoClicked(-1));
  }

  return (
    <div className="todo-component">
      <div className="checkbox-container">
        <input 
          checked={props.todo.completed} onChange={() => dispatch(editCompleted(props.todo, mode))} 
          type="checkbox" className="checkbox">
        </input>
      </div>
      <div 
        onDoubleClick={() => currentTodoClickedHandler()} className={"content-and-delete" + 
        (currentTodoClickedId === props.todo._id ? " hidden" : "")}>
        <label 
          className={props.todo.completed ? " line" : ""}>
          {props.todo.content}
        </label>
        <button 
          className="btn" onClick={() => dispatch(deleteTodo(props.todo._id, mode))} 
          onDoubleClick={(e) => deleteDoubleClickHandler(e)}><i className="fa fa-close"></i>
        </button>
      </div>
      {currentTodoClickedId === props.todo._id ? 
        <input 
          ref={editRef} autoFocus className="editable-content" defaultValue={props.todo.content} 
          onKeyUp={(e) => e.code === "Enter" && editContent(e)} onBlur={() => editContent()}>
        </input>
        : null}
    </div>
    )
}