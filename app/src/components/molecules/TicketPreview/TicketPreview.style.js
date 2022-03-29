import styled from 'styled-components';

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 80%;
  font-family: 'Oswald', sans-serif;
  min-height: 150px;
  max-height: 350px;
  overflow: hidden;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: 100% 45%;
  user-select: none;
  border-radius: 5px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  padding: 2rem 0.5rem;
  text-transform: uppercase;
  justify-content: center;
`;

export const FilmshowDetails = styled.div`
  display: flex;
  column-gap: 1rem;
  justify-content: center;
  opacity: 0.8;
`;

export const SeatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  justify-content: center;
`;

export const SeatCords = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const SeatNumber = styled.h3`
  color: var(--contrast);
`;

export const SeatHeader = styled.h3``;

export const Logo = styled.img`
  position: absolute;
  width: 100px;
  height: 75px;
  top: 0;
  left: 10px;
`;

export const WiderColumn = styled.div`
  width: 80%;
`;

export const NarrowerColumn = styled.div`
  background-color: white;
  width: 20%;
  height: 100%;
  padding: 1rem;
  color: var(--black);
`;

export const BarCode = styled.img`
  margin: 0.5rem 0;
  max-width: 100%;
`;

export const Row = styled.div`
  display: flex;
  column-gap: 1rem;
`;
