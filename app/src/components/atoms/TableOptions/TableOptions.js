import React from 'react';
import { EditIcon, OptionsData, RemoveIcon } from './TableOptions.style';
const TableOptions = ({
  record,
  record: { id } = {},
  handleRemoval = () => {},
  handleEditStart,
}) => {
  return (
    <OptionsData>
      <EditIcon
        onClick={() => {
          handleEditStart(record);
        }}
      />
      <RemoveIcon onClick={() => handleRemoval(id)} />
    </OptionsData>
  );
};

export default TableOptions;
