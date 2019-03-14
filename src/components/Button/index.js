/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Button({ classes, child, icon, onClick }) {
  return (
    <button className={`btn ${classes}`} onClick={onClick}>{icon} {child}</button>
  );
}

Button.propTypes = {
    classes: PropTypes.string,
    child: PropTypes.node,
    icon: PropTypes.node,
}

export default Button;
