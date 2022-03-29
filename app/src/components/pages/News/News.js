/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import NewsCard from '../../molecules/NewsCard/NewsCard';
import { Wrapper, Content, NewsContainer } from './News.style';
import { useBlogPost } from '../../../hooks/useBlogPost';
import Spinner from '../../atoms/Spinner/Spinner';
import { usePagination } from '../../../hooks/usePagination';
import { newsPerPage } from '../../../constants';
import Pagination from '../../atoms/Pagination/Pagination';

const News = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getBlogPosts } = useBlogPost();
  const { paginate, currentPage } = usePagination();
  const componentMounted = useRef(true);

  useEffect(() => {
    (async () => {
      componentMounted.current && setIsLoading(true);
      const blogPostsData = await getBlogPosts();
      if (blogPostsData && componentMounted.current) {
        setBlogPosts(blogPostsData);
      }
      componentMounted.current && setIsLoading(false);
    })();
    return () => (componentMounted.current = false);
  }, []);

  const renderBlogposts = () => {
    const blogpostArray = [];
    for (
      let i = newsPerPage * (currentPage - 1);
      i < blogPosts.length && i < newsPerPage * currentPage;
      i += 1
    ) {
      blogpostArray.push(
        <NewsCard key={blogPosts[i].id} post={blogPosts[i]} />
      );
    }
    return blogpostArray;
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <Content>
          <NewsContainer>
            {/* {blogPosts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))} */}
            {renderBlogposts()}
          </NewsContainer>
          <Pagination
            currentPage={currentPage}
            postsPerPage={newsPerPage}
            paginate={paginate}
            totalPosts={blogPosts.length}
          />
        </Content>
      )}
    </Wrapper>
  );
};

export default News;
