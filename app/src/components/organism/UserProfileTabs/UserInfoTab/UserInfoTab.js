import React from 'react';

import {
  Wrapper,
  Content,
  UserInfoContainer,
  UserImageContainer,
  UserImage,
  UserInfo,
  UserInfoLabel,
  UserInfoValue,
} from './UserInfoTab.style';
import { useAuth } from '../../../../hooks/useAuth';
import avatar from '../../../../images/img-01.png';

const UserInfoTab = () => {
  const { user } = useAuth();
  const { firstName, lastName, email, userName, points, image } = user;
  return (
    <Wrapper>
      <Content>
        <UserImageContainer>
          <UserImage
            src={image ? image : avatar}
            alt='brak zdjęcia profilowego'
          />
        </UserImageContainer>
        <UserInfoContainer>
          <UserInfo>
            <UserInfoLabel>IMIĘ</UserInfoLabel>
            <UserInfoValue>{firstName}</UserInfoValue>
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>NAZWISKO</UserInfoLabel>
            <UserInfoValue>{lastName}</UserInfoValue>
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>EMAIL</UserInfoLabel>
            <UserInfoValue>{email}</UserInfoValue>
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>NICK</UserInfoLabel>
            <UserInfoValue>{userName}</UserInfoValue>
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>PUNKTY RECENZJI</UserInfoLabel>
            <UserInfoValue>{points}</UserInfoValue>
          </UserInfo>
        </UserInfoContainer>
      </Content>
    </Wrapper>
  );
};

export default UserInfoTab;
