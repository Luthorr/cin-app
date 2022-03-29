import React from 'react';
import {
  Wrapper,
  Content,
} from '../../../molecules/AdminPanelTab/AdminPanelTab.style';
import { Table } from '../../../organism/Table/Table.style';
import TableHead from '../../../molecules/TableHead/TableHead';
import TableBody from '../../../molecules/TableBody/TableBody';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useCity } from '../../../../hooks/useCity';
import { toast } from 'react-toastify';

const CityTable = ({
  headers,
  allRecords,
  isVisible,
  setIsVisible,
  setCities,
  handleEditStart,
}) => {
  const handleFormVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  const { removeCity } = useCity();

  const handleRemoval = async (id) => {
    const answer = window.confirm('Czy chcesz usunąć wybrany rekord?');
    if (answer) {
      const status = await removeCity(id);
      if (status) {
        setCities((prevState) => {
          return prevState.filter((record) => record.id !== id);
        });
        toast.success('Rekord został pomyślnie usunięty.');
      } else {
        toast.error('Coś poszło nie tak.. Spróbuj ponownie.');
      }
    }
  };

  return (
    <Wrapper>
      <Content>
        <OutlineButton type='button' onClick={handleFormVisibilityChange}>
          Dodaj nowy
        </OutlineButton>
        <Table>
          <TableHead headers={headers} />
          <TableBody
            records={allRecords}
            params={['id', 'name']}
            handleRemoval={handleRemoval}
            handleEditStart={handleEditStart}
          />
        </Table>
      </Content>
    </Wrapper>
  );
};

export default CityTable;
