// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import Button from '../../components/common/Button';
// import PrevHeader from '../../components/header/PrevHeader';
// import BriefProfileMultiCard from '../../components/view/BriefProfileMultiCard';

// const ViewProfileDong = () => {
//   return (
//     <>
//       <PrevHeader title={'내 프로필'} navigateTo={'/mypage'} />
//       <WrapContent>
//         <BriefProfileMultiCard
//           type="dong"
//           nickname={userState.nickname}
//           gender={userState.gender === '여성' ? 'F' : 'M'}
//           age={calcAge(userState.birthYear)}
//           profile={userState.profile}
//           isMyProfile={true}
//         />
//         <WrapButton>
//           <Button
//             disabled={false}
//             userType={'nari'}
//             // 임시
//             onClick={() => navigate(`/update/myinfo`)}
//           >
//             기본 프로필 수정하기
//           </Button>
//         </WrapButton>
//       </WrapContent>
//     </>
//   );
// };

// const WrapContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   padding: 0 1.1rem;
//   margin: 1.5rem 0;
//   .last-content {
//     margin-bottom: 7rem;
//   }
// `;

// const WrapButton = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 1rem;
// `;

// export default ViewProfileDong;
