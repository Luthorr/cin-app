import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;
export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.8rem 0;
  border-bottom: 2px solid rgb(255, 255, 255, 0.3);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

export const UsernameText = styled.p`
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

export const DateText = styled.p`
  font-style: italic;
  font-size: 0.7rem;
  opacity: 0.6;
`;

export const ReviewText = styled.div`
  padding: 0.5rem 0;
`;
