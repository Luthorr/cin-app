import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';
import CinemaForm from './CinemaForm';
import CinemaTable from './CinemaTable';

const CinemaTab = ({ cinemas, setCinemas, cities }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedCinema, setEditedCinema] = useState(null);
  const { currentPage, paginate } = usePagination();

  const handleEditStart = (cinema) => {
    setShowForm(true);
    setEditedCinema(cinema);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <CinemaTable
            headers={['id', 'adres', 'miasto']}
            allRecords={cinemas.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setCinemas={setCinemas}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={cinemas.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <CinemaForm
          setShowForm={setShowForm}
          editedCinema={editedCinema}
          setEditedCinema={setEditedCinema}
          setCinemas={setCinemas}
          cities={cities}
        />
      )}
    </>
  );
};

export default CinemaTab;
