import React, { useState } from 'react';
import { recordsInTable } from '../../../../constants';
import { usePagination } from '../../../../hooks/usePagination';
import Pagination from '../../../atoms/Pagination/Pagination';
import { PaginationContainer, TableContainer } from '../Forms.style';

import BlogpostForm from './BlogpostForm';
import BlogpostTable from './BlogpostTable';

const BlogpostTab = ({ blogposts, setBlogposts }) => {
  const [showForm, setShowForm] = useState(false);
  const [editedBlogpost, setEditedBlogpost] = useState(null);
  const { currentPage, paginate } = usePagination();

  const handleEditStart = (blogpost) => {
    setShowForm(true);
    setEditedBlogpost(blogpost);
  };

  return (
    <>
      {!showForm ? (
        <TableContainer>
          <BlogpostTable
            headers={['id', 'tytuł', 'utworzony']}
            allRecords={blogposts.slice(
              recordsInTable * (currentPage - 1),
              currentPage * recordsInTable
            )}
            isVisible={showForm}
            setIsVisible={setShowForm}
            setBlogposts={setBlogposts}
            handleEditStart={handleEditStart}
          />
          <PaginationContainer>
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              totalPosts={blogposts.length}
              postsPerPage={recordsInTable}
            />
          </PaginationContainer>
        </TableContainer>
      ) : (
        <BlogpostForm
          setShowForm={setShowForm}
          editedBlogpost={editedBlogpost}
          setBlogposts={setBlogposts}
          setEditedBlogpost={setEditedBlogpost}
        />
      )}
    </>
  );
};

export default BlogpostTab;
