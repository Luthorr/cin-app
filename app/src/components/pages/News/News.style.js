import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--secondary);
  padding: 1.5rem;
  padding-top: 7rem;
  background-image: url('https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-blend-mode: overlay;
`;

export const Content = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.h1``;

export const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 1.5rem 0;
`;
