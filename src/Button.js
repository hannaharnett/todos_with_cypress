import React from 'react';
import './Button.scss';

const Button = (props) => {
  const { ariaLabel, action, icon, dataCy } = props;
  return (
    <button
      data-cy={dataCy}
      className="button"
      aria-label={ariaLabel}
      onClick={action}
    >
      <i className={icon}></i>
    </button>
  )
}

export default Button;