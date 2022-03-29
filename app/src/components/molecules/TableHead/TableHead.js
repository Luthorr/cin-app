import React from 'react';
import { THead, TRow, THeader } from './TableHead.style';

const TableHead = ({ headers }) => {
  return (
    <THead>
      <TRow>
        {headers.map((value) => (
          <THeader key={value}>{value}</THeader>
        ))}
        <THeader>Opcje</THeader>
      </TRow>
    </THead>
  );
};

export default TableHead;
