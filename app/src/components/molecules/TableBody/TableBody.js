import React from 'react';
import TableOptions from '../../atoms/TableOptions/TableOptions';
import { TBody, TRow, TData } from './TableBody.style';

const TableBody = ({ records, params, handleRemoval, handleEditStart }) => {
  const renderTableData = () => {
    const tableData = [];
    records.forEach((record) => {
      tableData.push(
        <TRow key={record.id}>
          {Object.keys(record).map((key) => {
            if (params.includes(key.toString())) {
              return <TData key={key}>{record[key]}</TData>;
            }
            return null;
          })}
          <TableOptions
            record={record}
            handleRemoval={handleRemoval}
            handleEditStart={handleEditStart}
          />
        </TRow>
      );
    });
    return tableData;
  };

  return <TBody>{renderTableData()}</TBody>;
};

export default TableBody;
