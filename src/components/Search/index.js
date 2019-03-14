/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Search({ name, id, onChange, onSubmit, valueSearch }) {
  return (
    <div className="search-content">
      <div className="input-form box-search">
        <input 
          type="text" 
          name={name}
          id={id}
          className="text-box"
          placeholder="Type something to search..." 
          onChange={onChange}
          value={valueSearch}
        />
        <button 
          className="btn search"
          onClick={onSubmit}
        >Search</button>
      </div>
    </div>
  );
}

Search.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  search: PropTypes.string,
}

export default Search;
