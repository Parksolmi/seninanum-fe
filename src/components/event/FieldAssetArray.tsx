import React from 'react';
import styled from 'styled-components';
import FieldCard from './FieldCard';

interface AssetArrayProps {
  field: { color: string; name: string };
}

const FieldAssetArray: React.FC<AssetArrayProps> = ({ field }) => {
  return (
    <ImgaeWrap>
      <FieldCard color={field.color} field={field.name} />
    </ImgaeWrap>
  );
};
const ImgaeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin: 0;
  margin-top: 20%;
`;
export default FieldAssetArray;
