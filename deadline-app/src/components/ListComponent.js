import React from 'react';
// Import components
import TodoList from './Todolist';

const ListComponent = ({
  todos,
  todoHandler,
  collapsibleStates,
  isLoaded,
  statusMessage,
}) => {
  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  const generateLists = list.map((listItem) => {
    const filtered = todos.filter((todo) => todo.list === listItem);
    // Change key to listid once refactored
    return (
      <ul key={listItem}>
        <h3>{listItem}</h3>
        <TodoList
          todos={filtered}
          todoHandler={todoHandler}
          collapsibleStates={collapsibleStates}
        />
      </ul>
    );
  });

  if (!isLoaded) {
    return <div className='list'>{statusMessage}</div>;
  } else {
    return <div className='list'>{generateLists}</div>;
  }
};

export default ListComponent;
