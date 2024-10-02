import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import DetailCard from '../../components/common/DetailCard';
import Fields from '../../components/common/Fields';
import PrevHeader from '../../components/header/PrevHeader';
import { calcAge } from '../../utils/calcAge';
import useFieldState from '../../store/fieldState';

interface Recruit {
  field: string; // 추가
  list: {
    recruitId: number;
    title: string;
    content: string;
    nickname: string;
    birthyear: string;
    method: string;
    region: string;
  }[];
}

const ViewRecruitList = () => {
  const navigate = useNavigate();
  const [recruitList, setRecruitList] = useState<Recruit[]>([]);

  const { fieldState } = useFieldState();

  //임시
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getRecruitList = async () => {
      try {
        //수정필요
        const res = await instance.get(`/recruit/filter`);
        setRecruitList(res.data);
      } catch (error) {
        setErrorMessage(error.response.data.error);
        console.log(error.response.data);
      }
    };
    getRecruitList();
  }, []);

  return (
    <>
      <WrapContent>
        <PrevHeader title={'구인글 목록'} navigateTo={'/home'} />
        <Fields
          list={recruitList.map((recruit) => ({
            id: recruit.list[0]?.recruitId, // 여기에 고유한 key 값을 추가
            field: recruit.field,
          }))}
          type={'dong'}
        />
      </WrapContent>
      <SplitLine />
      {errorMessage !== '' ? (
        <p>사용자가 선택한 분야가 없습니다. 경력프로필을 작성해주세요.</p>
      ) : (
        <>
          <WrapContent>
            {recruitList[fieldState.field]?.list.map((recruit) => (
              <DetailCard
                key={recruit.recruitId}
                type="nari"
                title={recruit.title}
                content={recruit.content}
                nickname={recruit.nickname}
                age={calcAge(recruit.birthyear)}
                method={recruit.method}
                region={recruit.region}
                navigateTo={() =>
                  navigate(`/view/recruit/${recruit.recruitId}`)
                }
              />
            ))}
          </WrapContent>
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
  margin-bottom: 1.5rem;
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;

export default ViewRecruitList;
