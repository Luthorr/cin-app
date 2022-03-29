import React from 'react';
import {
  ReviewsWrapper,
  ReviewsContainer,
  CreateReviewText,
  ReviewsHeader,
  SectionHeader,
} from './ReviewsSection.style';
import ReviewThumb from '../../molecules/ReviewThumb/ReviewThumb';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import { usePagination } from '../../../hooks/usePagination';
import { reviewsPerPage } from '../../../constants';
import Pagination from '../../atoms/Pagination/Pagination';

const ReviewsSection = ({ reviews, movieId }) => {
  const { paginate, currentPage } = usePagination();
  return (
    <ReviewsWrapper>
      <ReviewsHeader>
        <SectionHeader>RECENZJE ({reviews.length})</SectionHeader>
        <ReactLink to={`/review-create/${movieId}`}>
          <CreateReviewText>Napisz recenzję..</CreateReviewText>
        </ReactLink>
      </ReviewsHeader>
      <ReviewsContainer>
        {reviews.length > 0 ? (
          <>
            {reviews
              .slice(
                reviewsPerPage * (currentPage - 1),
                currentPage * reviewsPerPage
              )
              .map((review) => (
                <ReviewThumb key={review.id} review={review} />
              ))}
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              postsPerPage={reviewsPerPage}
              totalPosts={reviews.length}
            />
          </>
        ) : (
          <p style={{ alignSelf: 'flex-start' }}>
            Brak recenzji do wyświetlenia..
          </p>
        )}
      </ReviewsContainer>
    </ReviewsWrapper>
  );
};

export default ReviewsSection;
