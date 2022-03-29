/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  Content,
  Wrapper,
  Title,
  Header,
  InfoContainer,
  NewsText,
  NewsContainer,
  ImageWrapper,
  CreatedText,
  BGImage,
} from './NewsDetails.style';
import { OrangeLine } from '../../atoms/Lines/Lines';
import parse from 'html-react-parser';
import { useParams, useHistory } from 'react-router-dom';
import { useBlogPost } from '../../../hooks/useBlogPost';
import Spinner from '../../atoms/Spinner/Spinner';

const NewsDetails = () => {
  const { id } = useParams();
  const { getBlogPostById } = useBlogPost();
  const [blogPost, setBlogPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const blogPostData = await getBlogPostById(id);
      if (blogPostData) {
        setBlogPost(blogPostData);
      } else {
        history.push('/not-found');
      }
      setIsLoading(false);
    })();
  }, []);

  const { title, image, content, creationDate } = blogPost;

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ImageWrapper>
            <BGImage src={image} />
          </ImageWrapper>
          <Content>
            <Header>
              <InfoContainer>
                <Title>{title}</Title>
                <CreatedText>{creationDate}</CreatedText>
              </InfoContainer>
            </Header>
          </Content>
          <OrangeLine />
          <Content>
            <NewsContainer>
              <NewsText>{content && parse(content)}</NewsText>
            </NewsContainer>
          </Content>
        </>
      )}
    </Wrapper>
  );
};

export default NewsDetails;
