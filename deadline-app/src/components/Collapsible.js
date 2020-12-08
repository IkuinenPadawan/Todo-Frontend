import React from 'react';

/*
  Collapsible is a simple wrapper to allow showing/hiding of content.
  Collapsible's header prop is the content which is always visible,
  the 'header' or 'toggler' part of the component.
  This 'header' element can be clicked to toggle the collapsible content.
*/
function Collapsible(props) {
  // All these styles are very specific to this component,
  // so they are here and not in the scss file.
  // Anything (besides the icon in collapsible-header)
  // under collapsible-header or collapsible-content should
  // be styled in the scss file!

  // Header & content are their own 'rows'.
  const globalCollapsibleStyle = {
    main: { display: 'flex', flexFlow: 'row wrap' },
    header: { width: '100%' },
    content: { width: '100%' },
  };

  const iconWrapperStyle = {
    textAlign: 'center',
    width: '16px',
    height: '16px',
    marginRight: '1rem',
  };

  const iconStyle = {
    width: '100%',
    height: '100%',
    transform: props.isOpen ? 'rotate(90deg)' : '',
    transition: 'all 0.1s ease-out',
  };

  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <div className='collapsible' style={globalCollapsibleStyle.main}>
      <div
        className='collapsible-header'
        onClick={handleClick}
        style={globalCollapsibleStyle.header}
      >
        {
          <div style={iconWrapperStyle}>
            <i className='fas fa-angle-right' style={iconStyle}></i>
          </div>
        }
        {props.header}
      </div>
      <div
        className={
          props.isOpen ? 'collapsible-content' : 'collapsible-content collapsed'
        }
        style={globalCollapsibleStyle.content}
      >
        {props.isOpen ? props.children : null}
      </div>
    </div>
  );
}

export default Collapsible;
