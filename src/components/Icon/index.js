/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Icon({ classes, text }) {
  return (
    <span className={`icon ${classes}`}>{text}</span>
  );
}

Icon.propTypes = {
    classes: PropTypes.string,
    text: PropTypes.node,
}

export default Icon;
