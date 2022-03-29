import styled from 'styled-components';
// import { IoMdPlay } from 'react-icons/io';
import { RectButton } from '../../atoms/Button/RectButton';
import { OutlineButton } from '../../atoms/Button/OutlineButton';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

export const HiddenPoster = styled.img`
  display: none;
  width: 100%;
  padding: 2rem;
  object-fit: contain;
  border-radius: 10px 10px 0 0;
  filter: contrast(120%);
  @media (max-width: 480px) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--secondary);
  @media (max-width: 480px) {
    margin-top: 7rem;
  }
`;

export const HeroWrapper = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: flex;
  column-gap: 8rem;
  row-gap: 3rem;
  @media (max-width: 1024px) {
    max-width: 100%;
    flex-direction: column-reverse;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const PosterImg = styled.img`
  min-width: 250px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px 10px 0 0;
  box-shadow: rgba(0, 0, 0, 1) 0px 5px 50px 5px;
  filter: contrast(120%);
  margin-bottom: 2.5rem;
`;

export const NarrowerColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  height: 100%;
  @media (max-width: 1110px) {
    ${PosterImg} {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 0;
  }
  margin-top: -20rem;
`;

export const WiderColumn = styled(Column)`
  width: 70%;
  display: flex;
  flex-direction: row;
  column-gap: 2rem;
  justify-content: center;
  row-gap: 1.5rem;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
    flex-direction: column-reverse;
    margin-left: 0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const PlayButton = styled.div`
  background-color: var(--contrast);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 50%;
  padding: 0.7rem;
  align-self: flex-end;
  bottom: -25px;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0 0 40px #d35400;
  text-shadow: 0 0 25px #d35400;
  transition: all 0.15s ease-in-out;
`;

export const MovieInfo = styled.div`
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const SingleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.2rem;
  @media (max-width: 1024px) {
    font-size: 1.3rem;
  }
`;

export const InfoHeading = styled.p`
  opacity: 0.8;
`;

export const InfoValue = styled.p`
  opacity: 0.5;
`;

export const AdditionalInformations = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }
  margin-top: 1rem;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: 4rem;
  text-transform: uppercase;
  position: absolute;
  bottom: 70px;
  margin-left: -15%;

  @media (max-width: 1312px) {
    margin-left: -2%;
  }
`;

// export const NewScreen = styled.div`
//   display: flex;
//   justify-content: center;
//   /* padding: 5rem; */
//   margin: 2rem 0;
// `;

// export const ScreenPtOne = styled.div`
//   border-top: 75px solid rgb(80, 80, 80);
//   border-left: 70px solid transparent;
//   border-right: 70px solid transparent;
//   border-radius: 5px;
//   width: 50%;
//   position: relative;

//   &:after {
//     content: '';
//     border-left: inherit;
//     border-right: inherit;
//     border-top: inherit;
//     position: absolute;
//     width: 100%;
//     height: 100%;

//     transform: scaleY(-1);
//     opacity: 0.1;
//   }
// `;
// export const ScreenPtTwo = styled.div`
//   width: 500px;
//   height: 250px;
//   background-color: red;
//   transform: skew(-20deg);
// `;

export const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const FilmshowDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Oswald', sans-serif;
  padding: 1rem 0;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  padding: 0.2rem 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
`;

export const DetailLabel = styled.p`
  opacity: 0.7;
  text-transform: uppercase;
`;

export const DetailValue = styled.p``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  margin: 4rem 0;
  column-gap: 1rem;
`;

export const CancelButton = styled(OutlineButton)`
  width: 50%;
  margin: 0;
`;

export const ConfirmButton = styled(RectButton)`
  width: 50%;
  margin: 0;
`;

export const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const TotalPrice = styled.div`
  display: flex;
  column-gap: 0.5rem;
  padding: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Oswald', sans-serif;
`;

export const TotalPriceLabel = styled.p`
  opacity: 0.4;
`;

export const TotalPriceValue = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

export const ArrowPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const LeftArrow = styled(RiArrowLeftSLine)`
  font-weight: 600;
  font-size: 2.5rem;
  opacity: 0.7;
  cursor: pointer;
`;

export const RightArrow = styled(RiArrowRightSLine)`
  font-weight: 600;
  font-size: 2.5rem;
  opacity: 0.7;
  cursor: pointer;
`;

export const ReservationProcess = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const ReservationStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(55, 55, 55, 0.5);
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;

export const ReservationProgress = styled.div`
  display: flex;
  column-gap: 1rem;
  flex: 1 1 33%;
  align-items: center;
  justify-content: center;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  user-select: none;
  border-bottom: ${({ isActive }) =>
    isActive
      ? '3px solid rgba(227, 115, 60, 0.8)'
      : '3px solid rgba(255, 255, 255, 0.2)'};

  padding: 0.5rem 0;
  text-transform: uppercase;
  margin-bottom: 1rem;
  transition: border-bottom 0.2s ease-in-out;
  letter-spacing: 0.05rem;
`;

export const ReservationStepNumber = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const SpinnerContainer = styled.div`
  padding: 5rem 0;
`;
