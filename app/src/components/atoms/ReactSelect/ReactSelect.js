import React from 'react';
import Select from 'react-select';

const ReactSelect = ({
  options = [],
  placeholder = '',
  onChangeAction,
  value,
  name,
  reference,
}) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#27292e',
      border: 'none',
      color: '#FFF !important',
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: '#27292e',
        color: '#FFF',
        border: 'none',
      };
    },
    singleValue: (styles) => {
      return { ...styles, color: '#FFF' };
    },
    input: (styles) => {
      return { ...styles, color: '#FFF' };
    },
    menu: (styles) => {
      return {
        ...styles,
        color: '#FFF',
        backgroundColor: '#27292e',
      };
    },
  };
  return (
    <Select
      options={options}
      placeholder={placeholder}
      styles={colourStyles}
      onChange={(e) => onChangeAction(e, name)}
      value={value}
      name={name}
      ref={reference}
    />
  );
};

export default ReactSelect;
