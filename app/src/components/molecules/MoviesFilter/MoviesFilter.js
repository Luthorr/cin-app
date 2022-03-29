import React, { useState, useRef } from 'react';
import {
  Wrapper,
  Content,
  SelectMenu,
  SelectOption,
  LeftContainer,
  MenuOption,
  Icon,
  InputWrapper,
  FormInput,
} from './MoviesFilter.style';
import { FaSearch } from 'react-icons/fa';
import { MOVIE_FILTERS } from '../../../constants';

const MoviesFilter = ({
  setSearchTag,
  handleSorting,
  handleNestedSorting,
  handleAllMoviesShow,
  showPlayedMovies,
  showFutureMovies,
}) => {
  const currentFilterInit = [false, true, false];
  const sortRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState(currentFilterInit);
  const handleFilterChange = (idx, callback) => {
    setCurrentFilter(
      currentFilter.map((val, index) => (idx === index ? true : false))
    );
    sortRef.current.selectedIndex = 0;
    callback();
  };

  const handleSelectChange = (e) => {
    const filterIndex = e.target.value;
    const { nestedPropName, propName, asc } = MOVIE_FILTERS[filterIndex];
    if (nestedPropName) {
      handleNestedSorting(propName, nestedPropName, asc);
      return;
    }
    handleSorting(propName, asc);
  };

  return (
    <Wrapper>
      <Content>
        <LeftContainer>
          <MenuOption
            onClick={() => handleFilterChange(0, showPlayedMovies)}
            isActive={currentFilter[0]}
          >
            Aktualne
          </MenuOption>
          <MenuOption
            onClick={() => handleFilterChange(1, handleAllMoviesShow)}
            isActive={currentFilter[1]}
          >
            Wszystkie
          </MenuOption>
          <MenuOption
            onClick={() => handleFilterChange(2, showFutureMovies)}
            isActive={currentFilter[2]}
          >
            Nadchodzące
          </MenuOption>
          <SelectMenu ref={sortRef} onChange={handleSelectChange}>
            <SelectOption hidden>Sortuj</SelectOption>
            <SelectOption value={0}>Po popularności &#x25B4;</SelectOption>
            <SelectOption value={1}>Po popularności &#x25BE;</SelectOption>
            <SelectOption value={2}>Po dacie wydania &#x25B4;</SelectOption>
            <SelectOption value={3}>Po dacie wydania &#x25BE;</SelectOption>
            <SelectOption value={4}>Po ocenach &#x25B4;</SelectOption>
            <SelectOption value={5}>Po ocenach &#x25BE;</SelectOption>
          </SelectMenu>
        </LeftContainer>
        <InputWrapper>
          <FormInput
            type='text'
            placeholder='Wyszukaj...'
            onChange={(e) => setSearchTag(e.target.value.toLowerCase())}
          />
          <Icon>
            <FaSearch />
          </Icon>
        </InputWrapper>
      </Content>
    </Wrapper>
  );
};

export default MoviesFilter;
