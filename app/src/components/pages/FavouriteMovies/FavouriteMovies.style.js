import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 7rem 0;
  background-image: url(${({ moviesBG }) => moviesBG});
  background-color: var(--secondary);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-blend-mode: overlay;
  background-size: cover;
  background-position: 100% 90%;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--maxWidth);
  margin: 0 auto;
`;
