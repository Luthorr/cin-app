import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--secondary);
`;

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  z-index: 1;
  margin-top: -20rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const CalendarContainer = styled(HeaderRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 638px) {
    display: none;
  }
`;

export const ScheduleText = styled.p`
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
`;

export const Icon = styled.span`
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: var(--white);
  transition: all 0.4s;
`;

export const InputWrapper = styled.div`
  position: relative;
  z-index: 1;
  &:focus-within {
    ${Icon} {
      color: var(--contrast);
      padding-left: 28px;
    }
  }
`;

export const FormInput = styled.input`
  font-size: 1rem;
  color: var(--white);
  border: none;
  width: 100%;
  background: transparent;
  height: 40px;
  border-radius: 5px;
  padding: 0 30px 0 68px;
`;

export const FilmshowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

export const CinemaSelect = styled.select`
  background-color: transparent;
  border: none;
  color: var(--white);
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const CinemaOption = styled.option`
  background-color: var(--secondary);
  color: var(--white);
  border: none;
`;

export const InputCalendarContainer = styled(CalendarContainer)`
  display: none;
  padding: 6rem 0;
  @media (max-width: 638px) {
    display: flex;
    flex-direction: column;
  }
`;

export const InputCalendar = styled.input`
  background-color: transparent;
  border: none;
  color: var(--contrast);
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  font-family: 'Oswald', sans-serif;
`;

export const PickDateText = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

export const NoMoviesAvailable = styled.h2`
  padding: 3rem 0;
  text-align: center;
  opacity: 0.7;
`;
