import styled from 'styled-components';
import { TData } from '../../molecules/TableBody/TableBody.style';
import { FaTimes, FaEdit } from 'react-icons/fa';

export const OptionsData = styled(TData)`
  text-align: center;
`;

export const EditIcon = styled(FaEdit)`
  font-size: 1.5rem;
  margin: 0 0.2rem;
  cursor: pointer;
`;

export const RemoveIcon = styled(FaTimes)`
  font-size: 1.5rem;
  margin: 0 0.2rem;
  cursor: pointer;
`;
