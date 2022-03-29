import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';

import FilmshowForm from './FilmshowForm';
import FilmshowTable from './FilmshowTable';

const FilmshowTab = ({ cinemas, movies, filmshows, setFilmshows }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedFilmshow, setEditedFilmshow] = useState(null);
  const { paginate, currentPage } = usePagination();

  const handleEditStart = (filmshow) => {
    setShowForm(true);
    setEditedFilmshow(filmshow);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <FilmshowTable
            headers={['id', 'sala', 'film', 'data', 'miasto', 'ulica']}
            allRecords={filmshows.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setFilmshows={setFilmshows}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={filmshows.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <FilmshowForm
          setShowForm={setShowForm}
          cinemas={cinemas}
          movies={movies}
          editedFilmshow={editedFilmshow}
          setEditedFilmshow={setEditedFilmshow}
          setFilmshows={setFilmshows}
        />
      )}
    </>
  );
};

export default FilmshowTab;
