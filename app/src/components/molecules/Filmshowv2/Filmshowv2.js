import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrapper,
  PlaydateDay,
  PlaydateHour,
  RoomName,
} from './Filmshowv2.style';

const Filmshowv2 = ({ filmshow: { filmshowId, playDate, name } }) => {
  return (
    <Wrapper type='button' as={Link} to={`/reservation/${filmshowId}`}>
      <PlaydateDay>{playDate.split(' ')[0]}</PlaydateDay>
      <PlaydateHour>{playDate.split(' ')[1]}</PlaydateHour>
      <RoomName>{name}</RoomName>
    </Wrapper>
  );
};

export default Filmshowv2;
