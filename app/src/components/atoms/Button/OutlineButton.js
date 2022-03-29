import styled from 'styled-components';

import { RectButton } from './RectButton';

export const OutlineButton = styled(RectButton)`
  border-radius: 5px;
  background-color: var(--primary);
  border: 2px solid var(--contrast);
  color: var(--contrast);
  &:hover {
    background-color: var(--contrast);
    color: var(--white);
  }
`;
