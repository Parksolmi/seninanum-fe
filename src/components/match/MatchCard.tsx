import React from 'react';
import styled from 'styled-components';

interface MatchCardProps {
  type: string;
  title: string;
  content: string;
  fields: string[];
  method: string;
  region?: string;
  navigateTo: () => void;
  isApplicate: boolean;
}

const MatchCard = ({
  type,
  title,
  content,
  fields,
  method,
  region,
  navigateTo,
  isApplicate,
}: MatchCardProps) => {
  return (
    <InputContainer>
      {/*<MatchCard
        type="nari"
        title={'제목입니다. 제목입니다. 제목입니다.'}
        content={'공모전 피드백 부탁드립니다.'}
        method={'대면'}
        region={'동대문구'}
        navigateTo={() => navigate('/home')}
        fields={fields.split(',')}
        isApplicate={true} />*/}

      <ClickableArea onClick={navigateTo}>
        <WrapTop>
          <span>
            {fields.map((field, index) => (index >= 1 ? ` | ${field}` : field))}
          </span>
          {isApplicate ? <p>{'지원함'}</p> : ''}
        </WrapTop>

        <WrapTitle>{title}</WrapTitle>
        <WrapContent>{content}</WrapContent>
        <WrapTag>
          <Tag $type={type}>{method?.replace('서비스', '')}</Tag>
          {region !== '' && <Tag $type={type}>서울시 {region}</Tag>}
        </WrapTag>
      </ClickableArea>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const ClickableArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapTop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  span {
    color: #5b5b5b;
    font-family: NanumSquare;
  }
  p {
    color: #ff314a;
    font-family: NanumSquare;
    font-weight: 700;
    margin-left: auto;
  }
`;

const WrapTitle = styled.div`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  font-family: NanumSquare;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WrapContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.4rem;
  font-family: NanumSquare;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const WrapTag = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
interface tagType {
  $type: string;
}
const Tag = styled.div<tagType>`
  border-radius: 0.5rem;
  background: ${({ $type }) =>
    $type === 'nari' ? 'var(--Secondary-dong-2)' : 'var(--Secondary-nari-2)'};
  color: var(--Base-Deep-Gray, #414040);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
`;

export default MatchCard;
