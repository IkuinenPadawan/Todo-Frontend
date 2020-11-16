import React, { useState, useEffect } from 'react';

function SortButton(props) {
  const handleClick = (e) => {
    props.onClick(props.label);
  };

  return (
    <button className='btn py-05' onClick={handleClick}>
      {props.label}
    </button>
  );
}

function SortButtonListComponent(props) {
  const [sortAscending, setSortAscending] = useState(true);
  const [previouslyClicked, setPreviouslyClicked] = useState(null);

  const tasklist = props.tasklist.slice();
  const updateTasklist = props.updateTasklist;

  // Sort handling
  useEffect(() => {
    const arr = tasklist.slice();

    arr.sort((a, b) => {
      switch (previouslyClicked) {
        case 'Date':
          return sortAscending
            ? new Date(a.date.concat('Z')) - new Date(b.date.concat('Z'))
            : new Date(b.date.concat('Z')) - new Date(a.date.concat('Z'));
        case 'Name':
          return sortAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'Priority':
          return sortAscending
            ? a.priority - b.priority
            : b.priority - a.priority;
        case 'Completed':
          return sortAscending ? b.isdone - a.isdone : a.isdone - b.isdone;
        default:
          return 0;
      }
    });
    updateTasklist(arr);
  }, [sortAscending, previouslyClicked, updateTasklist]);

  const handleClick = (buttonLabel) => {
    if (buttonLabel === previouslyClicked) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }

    setPreviouslyClicked(buttonLabel);
  };

  return (
    <div>
      <ul className='sortbuttonlist'>
        Sort by:
        <li>
          <SortButton label='Date' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Name' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Priority' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Completed' onClick={handleClick} />
        </li>
      </ul>
    </div>
  );
}

export default SortButtonListComponent;
