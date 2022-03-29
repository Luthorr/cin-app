import React from 'react';
import {
  Wrapper,
  Content,
} from '../../../molecules/AdminPanelTab/AdminPanelTab.style';
import { Table } from '../../../organism/Table/Table.style';
import TableHead from '../../../molecules/TableHead/TableHead';
import TableBody from '../../../molecules/TableBody/TableBody';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useFilmshow } from '../../../../hooks/useFilmshow';
import { toast } from 'react-toastify';

const FilmshowTable = ({
  headers,
  allRecords,
  isVisible,
  setIsVisible,
  setFilmshows,
  handleEditStart,
}) => {
  const handleFormVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  const { removeFilmshow } = useFilmshow();

  const handleRemoval = async (id) => {
    const answer = window.confirm('Czy chcesz usunąć wybrany rekord?');
    if (answer) {
      const status = await removeFilmshow(id);
      if (status) {
        setFilmshows((prevState) => {
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
            params={[
              'id',
              'cityName',
              'title',
              'playDate',
              'street',
              'roomName',
            ]}
            handleRemoval={handleRemoval}
            handleEditStart={handleEditStart}
          />
        </Table>
      </Content>
    </Wrapper>
  );
};

export default FilmshowTable;
