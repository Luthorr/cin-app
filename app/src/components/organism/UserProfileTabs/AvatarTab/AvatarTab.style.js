import styled from 'styled-components';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';

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

export const AvatarFigure = styled.figure`
  text-align: center;
  width: 30%;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 3rem;
  }
  figcaption {
    font-weight: 600;
    opacity: 0.5;
    text-transform: uppercase;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const AvatarContainer = styled.div`
//   width: 30%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

export const UserImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 5px;
`;

export const AvatarForm = styled.div`
  width: 65%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UploadButton = styled(OutlineButton)`
  max-width: 155px;
  height: 55px;
  text-align: center;
`;
