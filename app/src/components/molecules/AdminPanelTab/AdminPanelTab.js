import React from 'react';

import { Wrapper, Content } from './AdminPanelTab.style';
import { Table } from '../../organism/Table/Table.style';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import { OutlineButton } from '../../atoms/Button/OutlineButton';

const MovieTab = ({
  children,
  headers,
  allRecords,
  isVisible,
  setIsVisible,
}) => {
  const handleFormVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Wrapper>
      <Content>
        {!isVisible && (
          <>
            <OutlineButton type='button' onClick={handleFormVisibilityChange}>
              Dodaj nowy
            </OutlineButton>
            <Table>
              <TableHead headers={headers} />
              <TableBody records={allRecords} />
            </Table>
          </>
        )}
      </Content>
      {isVisible && children}
    </Wrapper>
  );
};

export default MovieTab;
