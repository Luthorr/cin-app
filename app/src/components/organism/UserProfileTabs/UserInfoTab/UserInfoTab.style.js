import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const UserImageContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UserImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 5px;
`;
export const UserInfoContainer = styled.ul`
  width: 65%;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UserInfo = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  padding: 1rem 0;
`;

export const UserInfoLabel = styled.p`
  opacity: 0.4;
  text-transform: uppercase;
`;

export const UserInfoValue = styled.p`
  font-weight: 600;
  text-transform: uppercase;
`;
