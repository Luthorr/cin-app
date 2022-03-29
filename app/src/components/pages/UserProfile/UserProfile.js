import React, { useState } from 'react';
import {
  Content,
  Menu,
  MenuRow,
  WiderColumn,
  Wrapper,
} from './UserProfile.style';

import { UserProfileMenuItems } from '../../../constants';
import UserInfoTab from '../../organism/UserProfileTabs/UserInfoTab/UserInfoTab';
import EmailTab from '../../organism/UserProfileTabs/EmailTab/EmailTab';
import PasswordTab from '../../organism/UserProfileTabs/PasswordTab/PasswordTab';
import AvatarTab from '../../organism/UserProfileTabs/AvatarTab/AvatarTab';
import Spinner from '../../atoms/Spinner/Spinner';
import { useAuth } from '../../../hooks/useAuth';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(UserProfileMenuItems[0]);
  const { user } = useAuth();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const isTabActive = (tab) =>
    JSON.stringify(activeTab) === JSON.stringify(tab);

  return (
    <Wrapper>
      <Content>
        {!user ? (
          <Spinner />
        ) : (
          <>
            <Menu>
              {UserProfileMenuItems.map(({ title, icon }) => (
                <MenuRow
                  key={title}
                  onClick={() => handleTabChange({ title, icon })}
                  isActive={isTabActive({ title, icon })}
                >
                  {icon()}
                  {title}
                </MenuRow>
              ))}
            </Menu>
            <WiderColumn>
              {isTabActive(UserProfileMenuItems[0]) && <UserInfoTab />}
              {isTabActive(UserProfileMenuItems[1]) && <AvatarTab />}
              {isTabActive(UserProfileMenuItems[2]) && <EmailTab />}
              {isTabActive(UserProfileMenuItems[3]) && <PasswordTab />}
            </WiderColumn>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default UserProfile;
