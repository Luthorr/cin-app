import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';
import CityForm from './CityForm';
import CityTable from './CityTable';

const CityTab = ({ cities, setCities }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedCity, setEditedCity] = useState(null);
  const { paginate, currentPage } = usePagination();

  const handleEditStart = (city) => {
    setShowForm(true);
    setEditedCity(city);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <CityTable
            headers={['id', 'nazwa']}
            allRecords={cities.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setCities={setCities}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={cities.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <CityForm
          setShowForm={setShowForm}
          editedCity={editedCity}
          setEditedCity={setEditedCity}
          setCities={setCities}
        />
      )}
    </>
  );
};

export default CityTab;
