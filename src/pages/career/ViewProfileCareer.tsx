import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrevHeader from './../../components/header/PrevHeader';
import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';
import Button from '../../components/common/Button';
// import { instance } from '../../api/instance';
import { calcAge } from '../../utils/calcAge';
import { SyncLoader } from 'react-spinners';
import useCareerItemState from '../../store/careerItemState';
import CareerDetail from '../../components/common/CareerDetail';
import useCareerProfileState from './../../store/careerProfileState';
import useUserStore from '../../store/userSignupState';

const ViewProfileCareer = () => {
  const navigate = useNavigate();
  const { careerProfileState } = useCareerProfileState();
  const { careers } = useCareerItemState();
  const { userState } = useUserStore();

  // 기본 정보 조회 api 호출
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await instance.get(`/user/profile`);
  //       setUserState({
  //         nickname: res.data[0].nickname,
  //         gender: res.data[0].gender,
  //         birthYear: res.data[0].birthYear,
  //         profile: res.data[0].profile,
  //       });
  //     } catch (err) {
  //       console.error('기본정보 조회에 실패하였습니다.');
  //     }
  //   };
  //   fetchProfile();
  // }, [setUserState]);

  // useEffect(() => {
  //   const getCareerProfile = async () => {
  //     try {
  //       const res = await instance.get(`/career`);
  //       setCareerProfileState(res.data.careerProfile);
  //       setCareers(res.data.careerItems);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCareerProfile();
  // }, [setCareerProfileState, setCareers]);

  const onDelete = () => {};
  return (
    <>
      {careerProfileState === null ? (
        <WrapLoader>
          <SyncLoader color="var(--Primary-nari)" />
        </WrapLoader>
      ) : (
        <>
          <WrapContent>
            <PrevHeader title={'프로필 조회'} navigateTo={'/home'} />
            <BriefProfileMultiCard
              type="dong"
              nickname={userState.nickname}
              gender={userState.gender}
              age={calcAge(userState.birthYear)}
              introduce={careerProfileState.introduce}
            />
          </WrapContent>
          <SplitLine />
          <WrapContentSingle>
            <TitleText>분야</TitleText>
            <DetailText>{careerProfileState.field}</DetailText>
          </WrapContentSingle>

          <WrapContentSingle>
            <div className="last-content">
              <TitleText>희망조건</TitleText>
              <ConditionText>
                <tbody>
                  {careerProfileState.method && (
                    <tr>
                      <th>활동방식</th>
                      <td>{careerProfileState.method}</td>
                    </tr>
                  )}

                  {careerProfileState.region && (
                    <tr>
                      <th>활동지역</th>
                      <td>서울시 {careerProfileState.region}</td>
                    </tr>
                  )}
                  {careerProfileState.age && (
                    <tr>
                      <th>선호연령</th>
                      <td>아동,20대 {careerProfileState.age}</td>
                    </tr>
                  )}
                  {careerProfileState.priceType &&
                    careerProfileState.price > 0 && (
                      <tr>
                        <th>급여</th>
                        <td>
                          {careerProfileState.priceType}{' '}
                          {careerProfileState.price}원
                        </td>
                      </tr>
                    )}
                </tbody>
              </ConditionText>
            </div>
          </WrapContentSingle>
          <WrapContentSingle>
            <TitleText>경력</TitleText>
            {careers.map((career) => (
              <CareerDetail
                key={career.title}
                title={career.title}
                startYear={career.startYear}
                startMonth={career.startMonth}
                endYear={career.endYear}
                endMonth={career.endMonth}
                content={career.content}
                onDelete={() => onDelete}
              />
            ))}
          </WrapContentSingle>
          <WrapContentSingle>
            <TitleText>제공할 서비스</TitleText>
            <DetailText>{careerProfileState.service}</DetailText>
          </WrapContentSingle>
          <WrapButtonContainer>
            <WrapButton>
              <Button
                disabled={false}
                userType={'nari'}
                // 임시
                onClick={() => navigate('/chat')}
              >
                채팅하기
              </Button>
            </WrapButton>
          </WrapButtonContainer>
          <WrapContentSingle />
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
  .last-content {
    margin-bottom: 7rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 1.2rem 0;
`;
const WrapContentSingle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.1rem;
  margin-bottom: 2.5rem;
`;
const TitleText = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
`;
const DetailText = styled.div`
  color: var(--Base-Deep-Gray, #5b5b5b);
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ConditionText = styled.table`
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;

  th,
  td {
    padding-right: 20px;
    font-family: NanumSquare;
    font-size: 1.25rem;
  }

  th {
    color: #5b5b5b;
    font-weight: 700;
  }

  td {
    font-weight: 400;
  }
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

const WrapButtonContainer = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
`;

const WrapButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default ViewProfileCareer;
