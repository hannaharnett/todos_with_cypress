import React from 'react';
import './Button.scss';

const Button = (props) => {
  const { ariaLabel, action, icon } = props;
  return (
    <button
      className="button"
      aria-label={ariaLabel}
      onClick={action}
    >
      <i className={icon}></i>
    </button>
  )
}

export default Button;