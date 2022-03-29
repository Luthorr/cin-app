import React from 'react';
import {
  Wrapper,
  Content,
} from '../../../molecules/AdminPanelTab/AdminPanelTab.style';
import { Table } from '../../../organism/Table/Table.style';
import TableHead from '../../../molecules/TableHead/TableHead';
import TableBody from '../../../molecules/TableBody/TableBody';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useBlogPost } from '../../../../hooks/useBlogPost';
import { toast } from 'react-toastify';

const BlogpostTable = ({
  headers,
  allRecords,
  isVisible,
  setIsVisible,
  setBlogposts,
  handleEditStart,
}) => {
  const handleFormVisibilityChange = () => {
    setIsVisible(!isVisible);
  };

  const { removeBlogpost } = useBlogPost();

  const handleRemoval = async (id) => {
    const answer = window.confirm('Czy chcesz usunąć wybrany rekord?');
    if (answer) {
      const status = await removeBlogpost(id);
      if (status) {
        setBlogposts((prevState) => {
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
            params={['id', 'title', 'creationDate']}
            handleRemoval={handleRemoval}
            handleEditStart={handleEditStart}
          />
        </Table>
      </Content>
    </Wrapper>
  );
};

export default BlogpostTable;
