import React, { useEffect } from 'react';
import styled from 'styled-components';
import MyIndexPageDong from './MyIndexPageDong';
import MyIndexPageNari from './MyIndexPageNari';
import userTypeStore from '../../store/userState';
import TitleHeader from '../../components/header/TitleHeader';
import { instance } from '../../api/instance';
import useUserStore from '../../store/userSignupState';

const MyIndexPage: React.FC = () => {
  const { userType } = userTypeStore();
  const { userState, setUserState } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get(`/user/profile`);
        setUserState({
          nickname: res.data[0].nickname,
          gender: res.data[0].gender,
          birthYear: res.data[0].birthYear,
          profile: res.data[0].profile,
        });
      } catch (err) {
        console.error('기본정보 조회에 실패하였습니다.');
      }
    };
    fetchProfile();
  }, [setUserState]);

  return (
    <>
      <TitleHeader title="내 정보" isShowAlert={true} />
      <WrapContent>
        {userType === 'dong' ? (
          <MyIndexPageDong userState={userState} />
        ) : (
          <MyIndexPageNari userState={userState} />
        )}
      </WrapContent>
    </>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default MyIndexPage;
