import React, { useState, useEffect } from 'react';
// Import components
import TodoList from './Todolist';
import Collapsible from './Collapsible';

const ListComponent = ({
  todos,
  lists,
  todoHandler,
  collapsibleStates,
  isLoaded,
  statusMessage,
}) => {
  const [collapsedListStates, setCollapsedListStates] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  // Populate collapsedListStates with relevant objects.
  useEffect(() => {
    let array = [];
    array = lists.map((item) => {
      item = {
        id: item.id,
        isOpen: false,
      };
      return item;
    });
    setCollapsedListStates(array);
  }, [lists]);

  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  const getListId = (listname) => {
    const list = lists.find((item) => {
      return item.name.toLowerCase() === listname.toLowerCase();
    });
    return list.id;
  };

  const handleCollapse = (listId) => {
    let tmp = [...collapsedListStates];
    let clickedIndex = tmp.findIndex((item) => item.id === listId);
    tmp[clickedIndex].isOpen = !tmp[clickedIndex].isOpen;
    setCollapsedListStates(tmp);
  };

  const handleExpandAll = (e) => {
    let tmp = [...collapsedListStates];
    tmp.forEach((element) => {
      element.isOpen = true;
    });
    setCollapsedListStates(tmp);
  };

  const handleCollapseAll = (e) => {
    let tmp = [...collapsedListStates];
    tmp.forEach((element) => {
      element.isOpen = false;
    });
    setCollapsedListStates(tmp);
  };

  const handleCheckboxInputChange = (e) => {
    setHideCompleted(e.target.checked);
  };

  const setCollapsed = (listItem) => {
    let collapsibleState = collapsedListStates.find(
      ({ id }) => id === getListId(listItem)
    );
    return collapsibleState.isOpen;
  };

  const generateLists = list.map((listItem) => {
    let filtered = todos.filter((todo) => todo.list === listItem);
    if (hideCompleted) {
      filtered = filtered.filter((todo) => todo.isdone !== true);
    }
    return (
      <ul key={getListId(listItem)}>
        <Collapsible
          id={getListId(listItem)}
          header={<h3>{listItem}</h3>}
          onClick={handleCollapse}
          isOpen={setCollapsed(listItem)}
        >
          <TodoList
            todos={filtered}
            todoHandler={todoHandler}
            collapsibleStates={collapsibleStates}
          />
        </Collapsible>
      </ul>
    );
  });

  if (!isLoaded) {
    return <div className='list'>{statusMessage}</div>;
  } else {
    return (
      <>
        <div className='list-toolbar'>
          <button className='btn-alt' onClick={handleExpandAll}>
            Expand all lists
          </button>
          <button className='btn-alt' onClick={handleCollapseAll}>
            Collapse all lists
          </button>
          <div className='hide-completed-toggle'>
            <label className='checbox-wrapper'>
              <i
                className={
                  hideCompleted ? 'fas fa-check-square' : 'fas fa-square'
                }
              ></i>
              <input
                type='checkbox'
                checked={hideCompleted}
                onChange={handleCheckboxInputChange}
              />
              Hide completed
            </label>
          </div>
        </div>
        <div className='list'>{generateLists}</div>
      </>
    );
  }
};

export default ListComponent;
