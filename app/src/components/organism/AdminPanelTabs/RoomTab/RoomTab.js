import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';

import RoomForm from './RoomForm';
import RoomTable from './RoomTable';

const RoomTab = ({ cinemas, rooms, setRooms }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);
  const { currentPage, paginate } = usePagination();

  const handleEditStart = (room) => {
    setShowForm(true);
    setEditedRoom(room);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <RoomTable
            headers={['id', 'nazwa', 'miasto', 'adres']}
            allRecords={rooms.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setRooms={setRooms}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={rooms.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <RoomForm
          setShowForm={setShowForm}
          cinemas={cinemas}
          editedRoom={editedRoom}
          setEditedRoom={setEditedRoom}
          setRooms={setRooms}
        />
      )}
    </>
  );
};

export default RoomTab;
