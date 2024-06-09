import React, { useState } from 'react';
import styled from 'styled-components';
import regionState from './../../constants/regionState';

const RegionDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('강남구');
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: string, index: number) => {
    return () => {
      console.log(value);
      setSelectedRegion(value);
      setIsOpen(false);
    };
  };
  return (
    <SelectRegionArea>
      <RegionFixed>
        <SelectRegion>서울시</SelectRegion>
        <RegionLine></RegionLine>
      </RegionFixed>
      <RegionFixed onClick={onToggle}>
        <IconWrapper>
          <SelectRegion>{selectedRegion}</SelectRegion>
          <DropDownIcon>
            <img src="/assets/home/dropdown-icon.svg" alt="" />
          </DropDownIcon>
        </IconWrapper>
        <RegionLine></RegionLine>
        <DropDownBoxWrap>
          <DropDownContainer>
            {isOpen &&
              regionState.list.map((region, index) => (
                <ListItem key={region} onClick={onOptionClicked(region, index)}>
                  {region}
                </ListItem>
              ))}
          </DropDownContainer>
        </DropDownBoxWrap>
      </RegionFixed>
    </SelectRegionArea>
  );
};

const SelectRegion = styled.div`
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03rem;
`;

const SelectRegionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;

const RegionFixed = styled.button`
  width: 50%;
  height: 1.9375rem;
  flex-shrink: 0;
  background-color: transparent;
  border-color: transparent;
`;

const RegionLine = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: #8e8e8e;
  margin-top: 0.3rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DropDownIcon = styled.div`
  width: 0.75rem;
  height: 0.375rem;
  flex-shrink: 0;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DropDownBoxWrap = styled.div`
  height: 15rem;
  display: inline-block;
  height: 12rem;
  background-color: #fff;
  position: absolute;
  left: 59%;
`;

const DropDownContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.03rem;
`;

export default RegionDropDown;
