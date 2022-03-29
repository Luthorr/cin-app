import React, { useState, useRef } from 'react';

import {
  Wrapper,
  Content,
  AvatarForm,
  AvatarFigure,
  UserImage,
  UploadButton,
} from './AvatarTab.style';

import { Label, Text, ConfirmButton } from '../UserProfileTabs.style';
import avek from '../../../../images/img-01.png';
import { useFile } from '../../../../hooks/useFile';
import { useAuth } from '../../../../hooks/useAuth';
import { useUser } from '../../../../hooks/useUser';
import { toast } from 'react-toastify';

const AvatarTab = () => {
  const inputRef = useRef(null);
  const { user, setUser } = useAuth();
  const { isFileImage } = useFile();
  const { updateAvatar } = useUser();
  const [fileToUpload, setFileToUpload] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.image ? user.image : avek
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = isFileImage(file);
      if (isValid) {
        setAvatarPreview(URL.createObjectURL(file));
        setFileToUpload(file);
      }
    }
  };

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    const newAvatar = await updateAvatar(user.id, fileToUpload);
    if (newAvatar) {
      setUser((prevState) => ({ ...prevState, image: newAvatar }));
      setFileToUpload(null);
      toast.success('Profil został pomyślnie zaktualizowany.');
    } else {
      toast.error('Wystąpił błąd przy aktualizacji profilu.');
    }
  };

  return (
    <Wrapper>
      <Content>
        <AvatarFigure>
          <UserImage src={avatarPreview} />
          <figcaption>Twój avatar</figcaption>
        </AvatarFigure>
        <AvatarForm>
          <Label>Prześlij zdjęcie</Label>
          <Text>Zdjęcie musi być w jednym z formatów: .jpg, .jpeg, .png. </Text>
          <UploadButton onClick={() => inputRef.current.click()}>
            Wybierz plik
          </UploadButton>
          {fileToUpload && (
            <ConfirmButton onClick={handleAvatarUpdate}>Zapisz</ConfirmButton>
          )}
          <input
            type='file'
            ref={inputRef}
            onChange={handleFileUpload}
            hidden
          />
        </AvatarForm>
      </Content>
    </Wrapper>
  );
};

export default AvatarTab;
