import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from '../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import { useFetchProfile } from '../../hooks/useFetchProfile';

const ViewProfileNari = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useFetchProfile();

  return (
    <>
      {isLoading ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-dong)" />
        </WrapLoader>
      ) : (
        <>
          <PrevHeader title={'프로필 조회'} navigateTo={'/home'} />
          <WrapContent>
            {user && (
              <BriefProfileMultiCard
                type="nari"
                nickname={user.nickname}
                gender={user.gender}
                age={calcAge(user.birthYear)}
                profile={user.profile}
              />
            )}
            <WrapButton>
              <Button
                disabled={false}
                userType={'dong'}
                onClick={() => navigate(`/chatroom/dong`)}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapContent>

          <SplitLine />
        </>
      )}
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin: 1.5rem 0;
  .last-content {
    margin-bottom: 7rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;
const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default ViewProfileNari;
