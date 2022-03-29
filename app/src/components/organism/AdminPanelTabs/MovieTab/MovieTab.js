import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';

import MovieForm from './MovieForm';
import MovieTable from './MovieTable';

const MovieTab = ({ genres, movies, setMovies }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);
  const { currentPage, paginate } = usePagination();

  const handleEditStart = (movie) => {
    setShowForm(true);
    setEditedMovie(movie);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <MovieTable
            headers={['Id', 'Tytuł', 'Reżyser']}
            allRecords={movies.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setMovies={setMovies}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={movies.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <MovieForm
          setShowForm={setShowForm}
          genres={genres}
          setMovies={setMovies}
          editedMovie={editedMovie}
          setEditedMovie={setEditedMovie}
        />
      )}
    </>
  );
};

export default MovieTab;
